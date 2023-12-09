import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import sweetAlertController from "../../utils/sweetAlertController";

const UpdateMeals = () => {
  const { id } = useParams();
  console.log(id);

  const onSubmit = async (updatedData) => {
    console.log(updatedData);
    try {
      const ingre = updatedData.ingredients.split(",");
      updatedData["ingredients"] = ingre;
      console.log("updatededata", updatedData);
      const { data } = await axios.put(
        `${process.env.REACT_BASE_URL}/updatesMeals/${id}`,
        updatedData
      );
      console.log("update ", data);
      sweetAlertController(
        "Success!",
        "Update operation successful",
        "success",
        "close"
      );
    } catch (error) {
      sweetAlertController("Error!", error.message, "error", "close");
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { status, data, refetch } = useQuery({
    queryKey: ["meal"],
    queryFn: async ({ queryKey }) => {
      console.log(queryKey);
      return await axios.get(`${process.env.REACT_BASE_URL}/allMeals/${id}`);
    },
  });
  console.log("meal data", data?.data[0]);
  if (status === "loading") return <h1>Loading. . .</h1>;
  if (status === "error") {
    return <h1>{JSON.stringify(data.error)}</h1>;
  }
  if (status === "success") {
    // isAdmin = data.data?.data[0]?.role === "admin" ? true : false;
    return (
      <div>
        <div className='text-5xl my-4 font-extrabold text-center'>
          <h1>Update Meals</h1>
          <div className='divider w-1/2 mx-auto'></div>
        </div>
        <div
          className='w-3/4 mx-auto py-10 hero bg-transparent rounded-2xl my-4  border-2'
          style={{
            border: "2px solid #005B41",
            //   boxShadow: "0 5px 100px -20px #005B41",
          }}
        >
          <div className='w-9/12 md:w-full lg:w-1/2 hero-content flex-col '>
            <div className='card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100'>
              <form className='p-0 card-body' onSubmit={handleSubmit(onSubmit)}>
                <div className='justify-center form-control'>
                  <label>Title</label>
                  <input
                    type='Text'
                    placeholder='Meal Title'
                    className='input input-bordered mt-3 mb-4'
                    name='meal_title'
                    defaultValue={data?.data[0].meal_title}
                    {...register("meal_title", { required: true })}
                  />
                  {errors.name?.type === "required" && (
                    <p className='text-red-600 text-xs mb-3 ml-3'>
                      Title is required
                    </p>
                  )}
                  <label className='my-1'>Category</label>
                  <select
                    className='select select-accent w-full'
                    {...register("meal_category")}
                    defaultValue={data?.data[0].category}
                  >
                    <option value='breakfast'>Breakfast</option>
                    <option value='lunch'>Lunch</option>
                    <option value='dinner'>Dinner</option>
                  </select>
                  <label className='my-1'>Ingredients</label>
                  <input
                    type='text'
                    placeholder='ingredients (Comma separated)'
                    className='input input-bordered mt-4 tooltip text-left'
                    name='ingredients'
                    defaultValue={data?.data[0].ingredients.toString()}
                    data-tip='password must be grater than 6 characters and contain a capital letter and special character'
                    {...register("ingredients", {
                      required: true,
                    })}
                  />
                  {errors.password?.type === "required" && (
                    <p className='text-red-600 text-xs mt-3 ml-3'>
                      Ingredients is required
                    </p>
                  )}

                  <label className='my-1'>Image</label>
                  <input
                    type='text'
                    placeholder='Meal Pic URL'
                    className='input input-bordered mt-3 mb-4'
                    defaultValue={data?.data[0].meal_image}
                    name='meal_image'
                    {...register("meal_image", { required: true })}
                  />
                  {errors.meal_image?.type === "required" && (
                    <p className='text-red-600 text-xs mb-3 ml-3'>
                      URL is required
                    </p>
                  )}

                  <label className='my-1'>Description</label>
                  <input
                    type='text'
                    placeholder='Meal description'
                    className='input input-bordered mt-3 mb-4'
                    defaultValue={data?.data[0].description}
                    name='description'
                    {...register("description", { required: true })}
                  />
                  {errors.description?.type === "required" && (
                    <p className='text-red-600 text-xs mb-3 ml-3'>
                      Description is required
                    </p>
                  )}

                  <label className='my-1'>Price</label>
                  <input
                    type='number'
                    placeholder='Price in TAKA'
                    className='input input-bordered mt-3 mb-4'
                    defaultValue={data?.data[0].price_in_tk}
                    name='price_in_tk'
                    {...register("price_in_tk", { required: true })}
                  />
                  {errors.price_in_tk?.type === "required" && (
                    <p className='text-red-600 text-xs mb-3 ml-3'>
                      Price is required
                    </p>
                  )}
                  <label className='my-1'>Rating</label>
                  <input
                    type='number'
                    placeholder='Rating'
                    className='input input-bordered mt-3 mb-4'
                    defaultValue={data?.data[0].rating}
                    name='rating'
                    {...register("rating", {
                      required: true,
                      pattern: /^(?:[1-4](?:\.\d+)?|5(?:\.0+)?)$/,
                    })}
                  />
                  {errors.rating?.type === "pattern" && (
                    <p className='text-red-600 text-xs mb-3 ml-3'>
                      Ratting must be in between 1 to 5
                    </p>
                  )}

                  <label className='my-1'>Likes</label>
                  <input
                    type='number'
                    placeholder='Like'
                    className='input input-bordered mt-3 mb-4'
                    name='like'
                    defaultValue={data?.data[0].like}
                    {...register("like", { required: true })}
                  />
                  <label className='my-1'>Total Reviews</label>
                  <input
                    type='number'
                    placeholder='Reviews'
                    className='input input-bordered mt-3 mb-4'
                    name='reviews'
                    defaultValue={data?.data[0].reviews}
                    {...register("reviews", { required: true })}
                  />
                  <label className='my-1'>Distributor Name</label>
                  <input
                    type='Text'
                    placeholder='Distributor Name'
                    className='input input-bordered mt-3 mb-4'
                    name='distributor_name'
                    defaultValue={data?.data[0].distributor_name}
                    {...register("distributor_name", { required: true })}
                  />
                  {errors.distributor_name?.type === "required" && (
                    <p className='text-red-600 text-xs mb-3 ml-3'>
                      Distributor Name is required
                    </p>
                  )}
                  <label className='my-1'>Distributor Email</label>
                  <input
                    type='Text'
                    placeholder='Distributor Email'
                    className='input input-bordered mt-3 mb-4'
                    defaultValue={data?.data[0].distributor_email}
                    name='distributor_email'
                    {...register("distributor_email", { required: true })}
                  />
                  {errors.distributor_email?.type === "required" && (
                    <p className='text-red-600 text-xs mb-3 ml-3'>
                      Distributor Email is required
                    </p>
                  )}
                </div>
                <div className='flex flex-col md:flex-row gap-x-4 justify-center gap-y-4'>
                  <button className='btn btn-accent btn-outline rounded-lg w-full md:w-1/3'>
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default UpdateMeals;
