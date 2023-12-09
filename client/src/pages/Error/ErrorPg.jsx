import { Link } from "react-router-dom";

const ErrorPg = () => {
  return (
    <>
      <div className='bg-black flex flex-col justify-center items-center h-screen gap-8 text-secondary'>
        <h1 className='text-7xl font-extrabold'>404</h1>
        <p className='text-3xl font-bold'>OPPS!!! PAGE NOT FOUND</p>
        <p className='tex-xl font-semibold'>
          Sorry, the page you are looking for does not exit.
        </p>
        <Link className='btn btn-secondary btn-outline' to='/'>
          Go Back to Home
        </Link>
      </div>
    </>
  );
};

export default ErrorPg;
