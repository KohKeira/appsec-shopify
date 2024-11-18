import { useField } from "formik";

export const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mt-4 w-full">
      <label
        htmlFor={props.name}
        className="block mb-1 font-medium	text-gray-700"
      >
        {label}
      </label>
      <textarea
        rows={3}
        {...field}
        {...props}
        id={props.name}
        aria-required="true"
        className="block w-full border rounded shadow py-1 px-2 focus:outline-none focus:border-blue-300"
      />

      {/* show error message if touched and error is present */}
      {meta.error && meta.touched ? (
        <div className="text-sm text-red-500 mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};
