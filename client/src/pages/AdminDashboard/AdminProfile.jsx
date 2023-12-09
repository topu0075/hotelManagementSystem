import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className='text-5xl my-4 font-extrabold text-center'>
        <h1>Admin Profile</h1>
        <div className='divider w-1/2 mx-auto'></div>
        <div className='flex flex-col justify-center'>
          <img className='w-28 mx-auto' src={user.photoURL}></img>
          <h3 className='text-lg font-bold'>{user.displayName}</h3>
          <p className='text-xl'>{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
