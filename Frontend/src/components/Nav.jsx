import { useContext } from "react";
import { StateContext } from "./context/State";
import { IoIosAdd } from "react-icons/io";

export default function Nav() {
  const { setData } = useContext(StateContext);
  return (
    <div className=" w-full flex justify-end">
      <button
        onClick={() => setData()}
        className="bg-custom_orange flex justify-between items-center mt-5 mr-5 font-poppins_regular text-white px-3 py-2 rounded-lg"
      >
        <IoIosAdd size={30} /> Import New
      </button>
    </div>
  );
}
