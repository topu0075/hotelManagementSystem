import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MealCard from "../../../../../components/MealCard/MealCard";

const Cards = ({ data }) => {
  console.log(data);
  const btnGrp = (value) => (
    <div>
      <Link
        to={`/meal/${value}`}
        className='btn btn-secondary btn-outline px-10'
      >
        Details
      </Link>
    </div>
  );
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8'>
      {data &&
        data
          .slice(0, 6)
          .map((meal, idx) => (
            <MealCard key={idx} mealData={meal} btnGrp={btnGrp}></MealCard>
          ))}
    </div>
  );
};

Cards.propTypes = {
  data: PropTypes.array,
  btnGrp: PropTypes.func,
};

export default Cards;
