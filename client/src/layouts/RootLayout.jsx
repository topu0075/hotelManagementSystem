import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const Root = () => {
  return (
    <div className='flex flex-col justify-around'>
      <Header></Header>
      <div className='container mx-auto'>
        <Outlet></Outlet>
      </div>
      <div className='mt-20'>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Root;
