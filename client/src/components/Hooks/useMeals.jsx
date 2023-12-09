import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useMeals = () => {
  const { data: meals = [] } = useQuery({
    queryKey: ["meals"],
    queryFn: async ({ queryKey }) => {
      console.log(queryKey);
      const res = await axios.get(`${process.env.REACT_BASE_URL}/allMeals`);
      console.log(res);
      return res.data;
    },
  });
  return meals;
};

export default useMeals;
