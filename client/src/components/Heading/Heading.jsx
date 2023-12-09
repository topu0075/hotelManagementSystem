import PropTypes from "prop-types";

const Heading = ({ heading }) => {
  return (
    <div className='text-5xl mt-20 mb-16 font-extrabold text-center'>
      <h1>{heading}</h1>
      <div className='divider w-1/2 mx-auto'></div>
    </div>
  );
};

Heading.propTypes = {
  heading: PropTypes.string,
};

export default Heading;
