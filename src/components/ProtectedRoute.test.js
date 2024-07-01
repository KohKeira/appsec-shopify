import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import React from "react";
import AppContext from "../AppContext";
import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter } from "react-router-dom";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("axios");

describe("ProtectedRoute", () => {
  it("redirects to login page if user is not logged in", () => {
    const contextValue = { user: null };

    render(
      <AppContext.Provider value={contextValue}>
        <BrowserRouter>
          <ProtectedRoute />
        </BrowserRouter>
      </AppContext.Provider>
    );
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/login", {
      state: { error: "You need to be logged in to access this page" },
    });
    mockedUsedNavigate.mockClear();
  });

  it("redirects to login page if user is logged in with wrong token", async () => {
    const contextValue = { user: { token: "token" } };
    axios.get.mockRejectedValue({ response: { status: 403 } });

    render(
      <AppContext.Provider value={contextValue}>
        <BrowserRouter>
          <ProtectedRoute />
        </BrowserRouter>
      </AppContext.Provider>
    );
    await waitFor(() =>
      expect(mockedUsedNavigate).toHaveBeenCalledWith("/login", {
        state: { error: "You need to be logged in to access this page" },
      })
    );
    mockedUsedNavigate.mockClear();
  });

  it("redirects to login page if user is logged in with wrong role", async () => {
    const contextValue = { user: { token: "token" } };
    axios.get.mockRejectedValue({ response: { status: 401 } });

    render(
      <AppContext.Provider value={contextValue}>
        <BrowserRouter>
          <ProtectedRoute />
        </BrowserRouter>
      </AppContext.Provider>
    );
    await waitFor(() =>
      expect(mockedUsedNavigate).toHaveBeenCalledWith("/login", {
        state: { error: "You are not authorized" },
      })
    );

    mockedUsedNavigate.mockClear();
  });
});
