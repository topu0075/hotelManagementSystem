import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2/dist/sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const CustomizeMeals = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      meal_title: "",
      meal_category: "",
      meal_image: "",
      ingredients: [],
      description: "",
      price_in_tk: 0,
      rating: 0,
      time_of_posting: "",
      like: 0,
      reviews: 0,
      distributor_name: "",
      distributor_email: "",
    },
  });

  const [formData, setFormData] = useState("");

  const onSubmit = async (data) => {
    console.log(data);
    const date = new Date().toLocaleDateString();

    data["time_of_posting"] = date;
    const ingre = data.ingredients.split(",");
    data["ingredients"] = ingre;
    setFormData(data);
    console.log("mod,", data);

    try {
      const res = await axios.post(
        `${process.env.REACT_BASE_URL}/customizeMeal`,
        data
      );
      console.log(res);
      Swal.fire({
        title: "Success!",
        text: "Successfully Added, Please wait for admin to approve it.",
        icon: "success",
        confirmButtonText: "Proceed",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };
  const handleAddMeal = (value) => {
    console.log(value);
    console.log(formData);
  };

  return (
    <div>
      <div
        className='w-3/4 mx-auto py-10 hero bg-transparent rounded-2xl my-4  border-2'
        style={{
          border: "2px solid #005B41",
          boxShadow: "0 5px 100px -20px #005B41",
        }}
      >
        <div className='w-9/12 md:w-full lg:w-1/2 hero-content flex-col '>
          <div className='text-4xl my-4 font-extrabold text-center'>
            <h1>Customize Your Meals</h1>
            <div className='divider w-1/2 mx-auto'></div>
          </div>
          <div className='card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100'>
            <form className='p-0 card-body' onSubmit={handleSubmit(onSubmit)}>
              <div className='justify-center form-control'>
                <input
                  type='Text'
                  placeholder='Meal Title'
                  className='input input-bordered mt-3 mb-4 rounded-lg'
                  name='meal_title'
                  {...register("meal_title", { required: true })}
                />
                {errors.name?.type === "required" && (
                  <p className='text-red-600 text-xs mb-3 ml-3'>
                    Title is required
                  </p>
                )}
                <select
                  className='select select-accent w-full rounded-lg'
                  {...register("meal_category")}
                >
                  <option disabled selected>
                    Select Category
                  </option>
                  <option value='breakfast'>Breakfast</option>
                  <option value='lunch'>Lunch</option>
                  <option value='dinner'>Dinner</option>
                </select>

                <input
                  type='text'
                  placeholder='ingredients (Comma separated)'
                  className='input input-bordered mt-4 tooltip text-left rounded-lg'
                  name='ingredients'
                  data-tip='password must be grater than 6 characters and contain a capital letter and special character'
                  {...register("ingredients", {
                    required: true,
                  })}
                />
                {errors.password?.type === "required" && (
                  <p className='text-red-600 text-xs mt-3 ml-3 '>
                    Ingredients is required
                  </p>
                )}

                <input
                  type='text'
                  placeholder='Meal Pic URL'
                  className='input input-bordered mt-3 mb-4 rounded-lg'
                  name='meal_image'
                  {...register("meal_image", { required: true })}
                />
                {errors.meal_image?.type === "required" && (
                  <p className='text-red-600 text-xs mb-3 ml-3'>
                    URL is required
                  </p>
                )}

                <input
                  type='text'
                  placeholder='Meal description'
                  className='input input-bordered mt-3 mb-4 rounded-lg'
                  name='description'
                  {...register("description", { required: true })}
                />
                {errors.description?.type === "required" && (
                  <p className='text-red-600 text-xs mb-3 ml-3'>
                    Description is required
                  </p>
                )}

                <input
                  type='number'
                  placeholder='Price in TAKA'
                  className='input input-bordered mt-3 mb-4 rounded-lg'
                  name='price_in_tk'
                  {...register("price_in_tk", { required: true })}
                />
                {errors.price_in_tk?.type === "required" && (
                  <p className='text-red-600 text-xs mb-3 ml-3'>
                    Price is required
                  </p>
                )}
              </div>
              <div className='flex flex-col md:flex-row gap-x-4 justify-center gap-y-4'>
                <button
                  className='btn btn-accent btn-outline rounded-lg w-full md:w-1/'
                  onClick={() => handleAddMeal("addMeal")}
                >
                  Add Your Meal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeMeals;
