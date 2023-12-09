import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BiLike } from "react-icons/bi";
import MealCard from "../../components/MealCard/MealCard";

const UpcomingMeals = () => {
  const packagesQuery = useQuery({
    queryKey: ["upcomingMeals"],
    queryFn: async ({ queryKey }) => {
      console.log(queryKey);
      return await axios.get(`${process.env.REACT_BASE_URL}/upcomingMeals`);
    },
  });

  console.log(packagesQuery?.data?.data);
  const handleLike = (value) => {
    console.log("ids:- ", value);
  };

  const btnGrp = (value) => (
    <div>
      <button
        className='btn btn-secondary btn-outline px-10'
        onClick={() => handleLike(value)}
      >
        <BiLike /> Like
      </button>
    </div>
  );

  if (packagesQuery.status === "loading") return <h1>Loading. . .</h1>;
  if (packagesQuery.status === "error") {
    return <h1>{JSON.stringify(packagesQuery.error)}</h1>;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-y-10 mt-20'>
      {packagesQuery?.data?.data.map((meal, idx) => (
        <MealCard key={idx} mealData={meal} btnGrp={btnGrp}></MealCard>
      ))}
    </div>
  );
};

export default UpcomingMeals;
