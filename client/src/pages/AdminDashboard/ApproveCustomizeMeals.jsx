import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const ApproveCustomizeMeals = () => {
  const { status, data, refetch } = useQuery({
    queryKey: ["approve-meals"],
    queryFn: async ({ queryKey }) => {
      console.log(queryKey);
      return await axios.get(`${process.env.REACT_BASE_URL}/customizeMeal`);
    },
  });

  const handleOnClick = async (e) => {
    console.log("called ", e.target.value);
    const mealId = e.target.value;
    const approveMealsData = data.data.filter((meal) => meal._id === mealId);
    delete approveMealsData[0]._id;
    console.log();
    try {
      const res = await axios.post(
        `${process.env.REACT_BASE_URL}/upcomingMeals`,
        approveMealsData[0]
      );
      console.log(res.data.acknowledged);
      if (res.data.acknowledged) {
        deleteFromRequestedMeals(mealId);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFromRequestedMeals = async (mealId) => {
    console.log(mealId);
    try {
      const res = await axios.delete(
        `${process.env.REACT_BASE_URL}/deleteCustomMeal/${mealId}`
      );
      if (res.data.acknowledged) {
        refetch();
        Swal.fire({
          title: "Success!",
          text: "Successfully Added to upcoming meals.",
          icon: "success",
          confirmButtonText: "Proceed",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  if (status === "loading") return <h1>Loading. . .</h1>;
  if (status === "error") {
    return <h1>{JSON.stringify(data.error)}</h1>;
  }
  if (status === "success") {
    return (
      <div>
        <h1 className='font-bold text-3xl text-center my-10'>
          All Requested Meals
        </h1>
        <div className='overflow-x-auto'>
          <table className='table'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Ingredients</th>
                <th>Description</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((meal) => (
                <tr key={meal._id}>
                  <td>{meal.meal_title}</td>
                  <td>{meal.meal_category}</td>
                  <td>
                    {meal?.ingredients.map((ingredient, idx) => (
                      <span key={idx}>{ingredient}, </span>
                    ))}
                  </td>

                  <td>{meal.description}</td>
                  <td>{meal.price_in_tk}</td>
                  <td>
                    <button
                      className='btn btn-info btn-outline rounded-lg'
                      value={meal._id}
                      onClick={(e) => handleOnClick(e)}
                    >
                      Approve
                    </button>
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

export default ApproveCustomizeMeals;
