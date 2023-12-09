import { useParams } from "react-router-dom";

const CheckOut = () => {
  const { package_name } = useParams();
  console.log(package_name);
  return <div>this is checkout page</div>;
};

export default CheckOut;
