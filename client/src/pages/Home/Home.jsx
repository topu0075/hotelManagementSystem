import Banner from "./Components/Banner/Banner";
import MealTab from "./Components/MealTab/MealTab";
import Pricing from "./Components/Pricing/Pricing";
import Upcoming from "./Components/Upcoming/Upcoming";

const Home = () => {
  return (
    <div className='flex flex-col'>
      <div className='mt-10 md:mt-14'>
        <Banner></Banner>
      </div>
      <MealTab></MealTab>
      <Pricing></Pricing>
      <Upcoming></Upcoming>
    </div>
  );
};

export default Home;
