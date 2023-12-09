import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { FaBook, FaCalendar, FaHome, FaUtensils } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import {
  MdOutlineFastfood,
  MdOutlineNoMeals,
  MdOutlineRateReview,
  MdReviews,
  MdUpcoming,
} from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  let isAdmin;
  const userQuery = useQuery({
    queryKey: ["user-role"],
    queryFn: async ({ queryKey }) => {
      console.log(queryKey);
      return await axios.get(
        `${process.env.REACT_BASE_URL}/users/${user?.email}`
      );
    },
  });
  console.log(userQuery.data?.data[0]?.role);
  if (userQuery.status === "loading") return <h1>Loading. . .</h1>;
  if (userQuery.status === "error") {
    return <h1>{JSON.stringify(userQuery.error)}</h1>;
  }
  if (userQuery.status === "success") {
    isAdmin = userQuery.data?.data[0]?.role === "admin" ? true : false;
  }

  return (
    <>
      <div className='drawer lg:drawer-open'>
        <input id='my-drawer' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content'>
          <Header></Header>
          <div className='my-4 border-y-2 w-1/4 mx-auto'>
            {isAdmin ? (
              <h1 className='text-center font-semibold text-2xl my-2'>
                Admin Dashboard
              </h1>
            ) : (
              <h1 className='text-center font-semibold text-2xl my-2'>
                User Dashboard
              </h1>
            )}
          </div>
          <label
            htmlFor='my-drawer'
            className='ml-5 btn btn-primary drawer-button lg:hidden'
          >
            <IoMenu />
          </label>
          <Outlet></Outlet>
          <Footer></Footer>
        </div>
        <div className='drawer-side'>
          <label
            htmlFor='my-drawer'
            aria-label='close sidebar'
            className='drawer-overlay'
          ></label>
          <ul className='menu p-4 w-80 min-h-full bg-base-200 text-base-content lg:pt-32'>
            {isAdmin ? (
              <>
                <li>
                  <NavLink to='/dashboard/adminProfile'>
                    <FaHome></FaHome>
                    Admin Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/dashboard/addMeals'>
                    <FaUtensils></FaUtensils>
                    Add Meal
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/dashboard/manageUser'>
                    <FaBook></FaBook>
                    Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/dashboard/allMeals'>
                    <MdOutlineNoMeals />
                    All meals
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/dashboard/reviews'>
                    <MdReviews />
                    All Reviews
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/dashboard/servedMeals'>
                    <MdOutlineFastfood />
                    Serve Meals
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/dashboard/upcomingMeals'>
                    <MdUpcoming />
                    Upcoming Meals
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to='/dashboard/userProfile'>
                    <FaHome></FaHome>
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/dashboard/requestedMeals'>
                    <FaCalendar></FaCalendar>
                    Requested Meals
                  </NavLink>
                </li>

                <li>
                  <NavLink to='/dashboard/myReview'>
                    <MdOutlineRateReview />
                    My Reviews
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
