import { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import useMeals from "../../components/Hooks/useMeals";
import MealCard from "../../components/MealCard/MealCard";

const Meals = () => {
  const meals = useMeals();

  // eslint-disable-next-line no-unused-vars
  const [selectedOption, setSelectedOption] = useState("");
  const [mealData, setMealData] = useState(null);

  const options = [
    { value: "all", label: "All" },
    { value: "breakfast", label: "Breakfast" },
    { value: "lunch", label: "Lunch" },
    { value: "dinner", label: "Dinner" },
  ];

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    console.log("filter data", e.target.title.value);
    const filterByTitle = meals.filter(
      (title) => title.meal_title === e.target.title.value
    );
    console.log("filterByTitle", filterByTitle);
    setMealData(filterByTitle);
  };

  const handleSubmitFilter = (e) => {
    e.preventDefault();
    console.log("search data", e.target.low.value);
    console.log("search data", e.target.high.value);
    const filterByPrice = meals.filter(
      (price) =>
        price.price_in_tk >= e.target.low.value &&
        price.price_in_tk <= e.target.high.value
    );
    console.log("filterByPrice", filterByPrice);
    setMealData(filterByPrice);
  };

  const handleSelect = (e) => {
    setSelectedOption(e.value);
    console.log(mealData / length);
    if (e.value != "all") {
      const filterByCategory = meals.filter(
        (category) => category.meal_category === e.value
      );
      console.log("filterByCategory", filterByCategory);
      setMealData(filterByCategory);
    } else {
      setMealData(null);
    }
  };

  const btnGrp = (value) => (
    <div>
      <Link
        to={`/meal/${value}`}
        className='btn btn-secondary btn-outline px-10'
      >
        Details
      </Link>
    </div>
  );

  return (
    <>
      <div>
        <h1 className='text-5xl mt-20 mb-10 font-extrabold text-center'>
          All Meals
        </h1>
      </div>

      <div className='grid grid-cols-1  lg:grid-cols-3 gap-y-4 w-11/12 mx-auto'>
        <div className='cols-span-1 px-4'>
          <Select
            className='my-9'
            options={options}
            onChange={(e) => handleSelect(e)}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              backgroundColor: "black",
              colors: {
                ...theme.colors,
                primary25: "black",
                primary: "black",
              },
            })}
          ></Select>
        </div>

        <div className='cols-span-1'>
          <div>
            <form
              className='flex flex-wrap justify-center items-center gap-x-2 my-8'
              onSubmit={(e) => handleSubmitFilter(e)}
            >
              <input
                type='number'
                placeholder='Lowest'
                className='input input-group rounded-md  bg-gray-200 text-black w-36'
                name='low'
              />

              <input
                type='number'
                placeholder='Highest'
                className='input input-group rounded-md bg-gray-200 text-black w-36'
                name='high'
              />

              <button className='btn btn-secondary btn-outline rounded-lg'>
                Filter
              </button>
            </form>
          </div>
        </div>

        <div className='cols-span-1 '>
          <form
            className='flex flex-col lg:flex-row ml-4 my-8 items-center justify-center'
            onSubmit={(e) => handleSubmitSearch(e)}
          >
            <div>
              <input
                type='Text'
                placeholder='Title'
                className='input input-group rounded-md  mx-auto bg-gray-200 text-black'
                name='title'
              />
            </div>

            <div className='mx-auto'>
              <button className='btn btn-info btn-outline rounded-lg'>
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-y-10 mt-20'>
        {mealData != null
          ? mealData.map((meal, idx) => (
              <MealCard key={idx} mealData={meal} btnGrp={btnGrp}></MealCard>
            ))
          : meals.map((meal, idx) => (
              <MealCard key={idx} mealData={meal} btnGrp={btnGrp}></MealCard>
            ))}
      </div>
    </>
  );
};

export default Meals;
