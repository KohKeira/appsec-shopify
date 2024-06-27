import { useField } from "formik";

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mt-4 w-full">
      <label
        htmlFor={props.name}
        className="block mb-1 font-medium	text-gray-700"
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        className="block w-full border rounded shadow py-1 px-2 focus:outline-none focus:border-blue-300"
      />
      {/* show error message if touched and error is present */}
      {meta.error && meta.touched ? (
        <div className="text-sm text-red-500 mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};
export default TextField;
