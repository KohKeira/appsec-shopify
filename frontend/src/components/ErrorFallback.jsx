import React from "react";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div
      role="alert"
      className="min-h-screen flex flex-col justify-center items-center bg-gray-100"
    >
      <h1 className="text-3xl mb-8">Something went wrong</h1>
      <pre className="text-red-500 mb-8">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="text-lg text-white bg-purple-400 hover:bg-indigo-700 py-2 px-4 rounded"
      >
        Try again
      </button>
    </div>
  );
};
export default ErrorFallback;
