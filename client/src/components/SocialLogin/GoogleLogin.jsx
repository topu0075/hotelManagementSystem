import { FaGoogle } from "react-icons/fa";

const GoogleLogin = ({ btnName }) => {
  return (
    <button className='w-full btn btn-outline btn-secondary font-bold'>
      <FaGoogle />
      {btnName} with Google
    </button>
  );
};

export default GoogleLogin;
