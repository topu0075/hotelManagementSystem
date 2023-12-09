import axios from "axios";

const axiosSecure = axios.create({
  baseURL: `${process.env.REACT_BASE_URL}`,
});
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
