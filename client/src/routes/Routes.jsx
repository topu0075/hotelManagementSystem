import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layouts/Dashboard";
import Root from "../layouts/RootLayout";
import AddMeals from "../pages/AdminDashboard/AddMeals";
import AdminProfile from "../pages/AdminDashboard/AdminProfile";
import AllMeals from "../pages/AdminDashboard/AllMeals";
import AllReviews from "../pages/AdminDashboard/AllReviews";
import ManageUser from "../pages/AdminDashboard/ManageUser";
import ServeMeals from "../pages/AdminDashboard/ServeMeals";
import UpdateMeals from "../pages/AdminDashboard/UpdateMeals";
import CheckOut from "../pages/CheckOut/CheckOut";
import ErrorPg from "../pages/Error/ErrorPg";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import MealDetails from "../pages/MealDetails/MealDetails";
import Meals from "../pages/Meals/Meals";
import Registration from "../pages/Registation/Registration";
import UpcomingMeals from "../pages/UpcomingMeals/UpcomingMeals";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPg />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "/meals",
        element: <Meals></Meals>,
      },
      {
        path: "/meal/:id",
        element: <MealDetails></MealDetails>,
      },
      {
        path: "/checkout/:package_name",
        element: <CheckOut></CheckOut>,
      },
      {
        path: "/upcomingmeals",
        element: <UpcomingMeals></UpcomingMeals>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard></Dashboard>
      </PrivateRoutes>
    ),
    errorElement: <ErrorPg />,
    children: [
      {
        path: "/dashboard/adminProfile",
        element: (
          <PrivateRoutes>
            <AdminProfile />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/manageUser",
        element: (
          <PrivateRoutes>
            <ManageUser />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/addMeals",
        element: (
          <PrivateRoutes>
            <AddMeals />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/allMeals",
        element: (
          <PrivateRoutes>
            <AllMeals />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/reviews",
        element: (
          <PrivateRoutes>
            <AllReviews />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/servedMeals",
        element: (
          <PrivateRoutes>
            <ServeMeals />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/upcomingMeals",
        element: (
          <PrivateRoutes>
            <UpcomingMeals />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/allMeals/updateMeal/:id",
        element: (
          <PrivateRoutes>
            <UpdateMeals />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default router;
