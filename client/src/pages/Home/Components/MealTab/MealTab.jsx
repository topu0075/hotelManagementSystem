import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { NavLink } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Heading from "../../../../components/Heading/Heading";
import useMeals from "../../../../components/Hooks/useMeals";
import Cards from "./Cards/Cards";

const MealTab = () => {
  const meals = useMeals();
  console.log("meals", meals.length);
  let allData;
  let breakfast;
  let lunch;
  let dinner;

  const packagesQuery = useQuery({
    queryKey: ["mealData"],
    queryFn: async ({ queryKey }) => {
      console.log(queryKey);
      return await axios.get(`${process.env.REACT_BASE_URL}/allMeals`);
    },
  });
  if (packagesQuery.status === "loading") return <h1>Loading. . .</h1>;
  if (packagesQuery.status === "error") {
    return <h1>{JSON.stringify(packagesQuery.error)}</h1>;
  }
  if (packagesQuery.status === "success") {
    allData = packagesQuery?.data?.data;
    breakfast = packagesQuery?.data?.data.filter(
      (data) => data.meal_category === "breakfast"
    );
    lunch = packagesQuery?.data?.data.filter(
      (data) => data.meal_category === "lunch"
    );
    dinner = packagesQuery?.data?.data.filter(
      (data) => data.meal_category === "dinner"
    );
  }
  return (
    <>
      <Heading heading='Menus'></Heading>
      <div className='mb-10 w-10/12 mx-auto'>
        <Tabs>
          <TabList>
            <Tab>All Meals</Tab>
            <Tab>Breakfast</Tab>
            <Tab>Lunch</Tab>
            <Tab>Dinner</Tab>
          </TabList>

          <TabPanel className='mt-14'>
            <Cards data={allData}></Cards>
          </TabPanel>
          <TabPanel>
            <Cards data={breakfast}></Cards>
          </TabPanel>
          <TabPanel>
            <Cards data={lunch}></Cards>
          </TabPanel>
          <TabPanel>
            <Cards data={dinner}></Cards>
          </TabPanel>
        </Tabs>
      </div>
      <div className='flex justify-center mt-10'>
        <NavLink className='btn btn-secondary rounded-lg px-10' to='/meals'>
          See All{" "}
        </NavLink>
      </div>
    </>
  );
};

export default MealTab;
