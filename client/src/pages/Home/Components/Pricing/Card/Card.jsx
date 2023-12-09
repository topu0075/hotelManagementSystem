import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

const Card = ({ packageInfo }) => {
  console.log({ packageInfo });
  const package_name = packageInfo.name.toLowerCase();
  return (
    <div className='card w-96 bg-primary text-primary-content shadow-md shadow-gray-400'>
      <div className='card-body'>
        <h2 className='text-2xl text-center font-extrabold my-2'>
          {packageInfo.name}
        </h2>
        <div className='mb-2'>
          <p className='text-4xl font-semibold text-center border-t-2 border-b-2 py-2 border-gray-700'>
            {packageInfo.price} TK
          </p>
        </div>

        <ul className='list-disc pl-4'>
          {packageInfo.includes.map((packageIncludes, idx) => (
            <li key={idx} className='my-1'>
              {packageIncludes}
            </li>
          ))}
        </ul>

        <div className='card-actions justify-center mt-5'>
          <Link className='btn px-10' to={`/checkout/${package_name}`}>
            Subscribe Now
          </Link>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  packageInfo: PropTypes.object,
};

export default Card;
