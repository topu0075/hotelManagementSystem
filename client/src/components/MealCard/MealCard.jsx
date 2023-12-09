import PropTypes from "prop-types";

const MealCard = ({ mealData, btnGrp }) => {
  return (
    <div className='card bg-base-100 shadow-md w-10/12 mx-auto border-2 border-secondary shadow-secondary'>
      <figure className='px-10 pt-10'>
        <img
          src={mealData.meal_image}
          alt='Shoes'
          className='rounded-xl w-40 h-40'
        />
      </figure>
      <div className='card-body items-center  mx-auto text-left'>
        <h2 className='card-title border-b-2 border-gray-500'>
          {mealData.meal_title}
        </h2>
        <div className='flex flex-col justify-start gap-y-3 mt-2'>
          <p className=''>{mealData.description.slice(0, 100)}</p>
          <p className='font-semibold mt-2'>
            Category:
            <span className='text-secondary text-lg ml-2 pr-1 font-extrabold'>
              {mealData.meal_category.toUpperCase()}
            </span>
          </p>
          <p className='font-semibold mt-2'>Ingredients:</p>
          <div className='card-actions'>
            {mealData.ingredients.map((item, idx) => (
              <div key={idx} className='badge badge-secondary'>
                {item.toUpperCase()}
              </div>
            ))}
          </div>
          <p className='font-semibold mt-2'>
            Rating:
            <span className='text-secondary text-lg ml-2 pr-1 font-extrabold'>
              {mealData.rating}
            </span>
          </p>
          <p className='font-semibold mt-2'>
            Price:
            <span className='text-secondary text-2xl ml-2 pr-1 font-extrabold'>
              {mealData.price_in_tk}
            </span>
            TK
          </p>
        </div>
      </div>
      <div className='card-actions justify-center mb-10'>
        {btnGrp(mealData._id)}
      </div>
    </div>
  );
};

MealCard.propTypes = {
  mealData: PropTypes.object,
  btnGrp: PropTypes.func,
};

export default MealCard;
