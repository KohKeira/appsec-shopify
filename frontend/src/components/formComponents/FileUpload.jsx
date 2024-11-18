import { useField } from "formik";

const FileUpload = ({ label, fileRef, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mt-4 w-full">
      <label
        htmlFor={props.name}
        className="block mb-1 font-medium	text-gray-700"
      >
        Choose File {label}
      </label>
      <input
        {...field}
        type="file"
        id={props.name}
        ref={fileRef}
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
export default FileUpload;
