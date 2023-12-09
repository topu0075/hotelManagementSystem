import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Heading from "../../../../components/Heading/Heading";
import Card from "./Card/Card";

const Pricing = () => {
  const packagesQuery = useQuery({
    queryKey: ["packages"],
    queryFn: async ({ queryKey }) => {
      console.log(queryKey);
      return await axios.get(`${process.env.REACT_BASE_URL}/packages`);
    },
  });
  if (packagesQuery.status === "loading") return <h1>Loading. . .</h1>;
  if (packagesQuery.status === "error") {
    return <h1>{JSON.stringify(packagesQuery.error)}</h1>;
  }
  return (
    <>
      <Heading heading='Our Packages'></Heading>
      <div className='flex flex-wrap mt-10 justify-center gap-x-10 gap-y-10'>
        {packagesQuery?.data?.data.map((packageData) => (
          <div key={packageData._id}>
            <Card packageInfo={packageData}></Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default Pricing;
