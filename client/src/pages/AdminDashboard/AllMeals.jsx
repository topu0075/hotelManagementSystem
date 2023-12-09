import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import sweetAlertController from "../../utils/sweetAlertController";

const AllMeals = () => {
  const handleDelete = async (id) => {
    console.log(id);
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_BASE_URL}/deleteMeal/${id}`
      );
      console.log(data);
      if (data?.acknowledged && data.deletedCount === 1) {
        sweetAlertController(
          "Success!",
          "Delete operation successful",
          "success",
          "close"
        );
        refetch();
      }
    } catch (error) {
      sweetAlertController(
        "Error!",
        "Delete operation Failed",
        "error",
        "close"
      );
    }
  };
  const { status, data, refetch } = useQuery({
    queryKey: ["meals"],
    queryFn: async ({ queryKey }) => {
      console.log(queryKey);
      return await axios.get(`${process.env.REACT_BASE_URL}/allMeals`);
    },
  });
  console.log("meals data", data);
  if (status === "loading") return <h1>Loading. . .</h1>;
  if (status === "error") {
    return <h1>{JSON.stringify(data.error)}</h1>;
  }
  if (status === "success") {
    // isAdmin = data.data?.data[0]?.role === "admin" ? true : false;
    return (
      <div>
        <h1 className='font-bold text-3xl text-center my-10'>All Meals</h1>
        <div className='overflow-x-auto'>
          <table className='table'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Likes</th>
                <th>Reviews</th>
                <th>Distributor</th>
                <th>Email</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((meal) => (
                <tr key={meal._id}>
                  <td>{meal.meal_title}</td>
                  <td>{meal.like}</td>
                  <td>{meal.reviews}</td>
                  <td>{meal.distributor_name}</td>
                  <td>{meal.distributor_email}</td>
                  <td>
                    <Link
                      className='btn btn-info btn-outline rounded-lg'
                      to={`updateMeal/${meal._id}`}
                    >
                      Update
                    </Link>
                  </td>
                  <td>
                    <button
                      className='btn btn-error btn-outline rounded-lg'
                      onClick={() => handleDelete(meal._id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <Link
                      className='btn btn-secondary btn-outline rounded-lg'
                      to={`http://localhost:5173/meal/${meal._id}`}
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default AllMeals;
