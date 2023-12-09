import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const ManageUser = () => {
  const handleClick = async (id, role) => {
    console.log(id, role);
    if (role === "admin") {
      Swal.fire({
        title: "Error!",
        text: "This user is already admin",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } else {
      try {
        const res = await axios.put(
          `${process.env.REACT_BASE_URL}/makeAdmin/${id}`
        );
        console.log(res);
        Swal.fire({
          title: "Success!",
          text: "Role ModificationCompleted",
          icon: "success",
          confirmButtonText: "close",
        });
        refetch();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    }
  };
  const { status, data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async ({ queryKey }) => {
      console.log(queryKey);
      return await axios.get(`${process.env.REACT_BASE_URL}/users`);
    },
  });
  console.log("asd", data);
  if (status === "loading") return <h1>Loading. . .</h1>;
  if (status === "error") {
    return <h1>{JSON.stringify(data.error)}</h1>;
  }
  if (status === "success") {
    // isAdmin = data.data?.data[0]?.role === "admin" ? true : false;
  }
  return (
    <div>
      <div className='text-5xl my-4 font-extrabold text-center'>
        <h1>All Users</h1>
        <div className='divider w-1/2 mx-auto'></div>
      </div>

      <div className='overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Member Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.badge}</td>
                <td>
                  <button
                    className='btn btn-primary btn-outline'
                    onClick={() => handleClick(user._id, user.role)}
                  >
                    Make Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
