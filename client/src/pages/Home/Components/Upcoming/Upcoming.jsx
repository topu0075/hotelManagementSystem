import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { BiLike } from "react-icons/bi";
import Heading from "../../../../components/Heading/Heading";
import MealCard from "../../../../components/MealCard/MealCard";

const Reviews = () => {
  const packagesQuery = useQuery({
    queryKey: ["upcomingMeals"],
    queryFn: async ({ queryKey }) => {
      console.log(queryKey);
      return await axios.get(`${process.env.REACT_BASE_URL}/upcomingMeals`);
    },
  });

  const btnGrp = (value) => (
    <div>
      <button className='btn btn-secondary btn-outline px-10'>
        <BiLike /> Liked ({value})
      </button>
    </div>
  );

  if (packagesQuery.status === "loading") return <h1>Loading. . .</h1>;
  if (packagesQuery.status === "error") {
    return <h1>{JSON.stringify(packagesQuery.error)}</h1>;
  }
  return (
    <>
      <Heading heading='Upcoming Meals'></Heading>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8'>
        {packagesQuery?.data?.data.slice(0, 4).map((meal, idx) => (
          <MealCard
            key={idx}
            mealData={meal}
            btnGrp={() => btnGrp(meal.like)}
          ></MealCard>
        ))}
      </div>
    </>
  );
};

export default Reviews;
