import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AiFillLike } from "react-icons/ai";
import { useParams } from "react-router-dom";

const MealDetails = () => {
  const { id } = useParams();
  console.log(id);
  let mealData;

  const handleMakeRequest = () => {
    console.log("handleMakeRequest");
  };

  const handleLikes = () => {
    console.log("handleLikes");
  };
  const handleReviews = (e) => {
    e.preventDefault();
    console.log("submit");
    console.log(e.target.review.value);
  };

  const packagesQuery = useQuery({
    queryKey: [id],
    queryFn: async ({ queryKey }) => {
      console.log(queryKey);
      return await axios.get(`${process.env.REACT_BASE_URL}/allMeals/${id}`);
    },
  });

  if (packagesQuery.status === "loading") return <h1>Loading. . .</h1>;
  if (packagesQuery.status === "error") {
    return <h1>{JSON.stringify(packagesQuery.error)}</h1>;
  }
  if (packagesQuery.status === "success") {
    mealData = packagesQuery?.data?.data[0];

    return (
      <div>
        <h1 className='text-4xl text-center font-extrabold my-10'>
          Meal details
        </h1>
        <div className='flex flex-col justify-center gap-5'>
          <div className='flex flex-col lg:flex-row justify-center w-10/12 mx-auto gap-3 lg:gap-5'>
            <div className='w-11/12 lg:w-10/12 mx-auto'>
              <img
                src={mealData.meal_image}
                alt='banner image'
                className='w-full h-1/3 mx-auto'
              />
              <div className='mt-0 divider'></div>
              <div className='flex flex-col md:flex-row gap-x-2'>
                <button
                  className='btn btn-secondary w-full md:w-1/2 rounded-lg mb-4'
                  onClick={handleMakeRequest}
                >
                  Make Request
                </button>
                <button
                  className='btn btn-error w-full md:w-1/2 rounded-lg mb-4'
                  onClick={handleLikes}
                >
                  <AiFillLike /> Like ({mealData.review})
                </button>
              </div>

              <h3 className='text-lg lg:text-3xl font-bold ml-2 md:ml-0'>
                {mealData.meal_title}
              </h3>
              <p className='mt-2 text-justify'>{mealData.description}</p>
              <div className='lg:w-3/4'>
                <p className='my-2 mr-2'>
                  <span className='font-bold text-lg'>Distributor: </span>
                  {mealData.distributor_email}
                </p>
              </div>
              <div className='lg:w-3/4'>
                <p className='my-2 mr-2'>
                  <span className='font-bold text-lg'>Category: </span>
                  {mealData.meal_category.toUpperCase()}
                </p>
              </div>
              <div className='lg:w-3/4 my-2'>
                <span className='my-2 mr-2 font-bold text-lg'>
                  Ingredients:
                </span>

                {mealData.ingredients.map((item, idx) => (
                  <div key={idx} className='badge badge-secondary mx-2 mb-1'>
                    {item.toUpperCase()}
                  </div>
                ))}
              </div>

              <div className='lg:w-3/4'>
                <p className='my-2 mr-2'>
                  <span className='font-bold text-lg'>Price: </span>
                  {mealData.price_in_tk} taka
                </p>
              </div>
              <div className='lg:w-3/4'>
                <p className='my-2 mr-2'>
                  <span className='font-bold text-lg'>Job Posted: </span>
                  {mealData?.time_of_posting}
                </p>
              </div>
              <div className='lg:w-3/4'>
                <p className='my-2 mr-2'>
                  <span className='font-bold text-lg'>Rating: </span>
                  {mealData.rating}
                </p>
              </div>
              <div className='lg:w-3/4'>
                <p className='my-2 mr-2'>
                  <span className='font-bold text-lg'>Reviews: </span>
                  {mealData.reviews}
                </p>
              </div>
            </div>

            <div className='w-11/12 lg:w-1/2 lg:pl-5 '>
              <h3 className='text-2xl my-5 font-bold text-center'>Reviews</h3>
              <div className='card bg-accent text-primary-content mx-auto '>
                <form className='card-body' onSubmit={(e) => handleReviews(e)}>
                  <textarea
                    className='textarea textarea-accent rounded-lg bg-gray-200'
                    placeholder='Write a review'
                    name='review'
                  ></textarea>
                  <div className='card-actions justify-end'>
                    <button className='btn w-full rounded-lg'>Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MealDetails;
