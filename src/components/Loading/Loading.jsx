import { FaSpinner } from "react-icons/fa";

export default function Loading() {
  return (
    <>
      <span
        className="flex justify-center  "
      >
        
        <FaSpinner className="animate-spin" />
      </span>
    </>
  );
}
