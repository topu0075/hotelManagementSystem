const Banner = () => {
  return (
    <div
      className='hero h-96'
      style={{
        backgroundImage: "url(https://i.ibb.co/MRLQpcz/banner-Img.png)",
      }}
    >
      <div className='hero-overlay bg-opacity-50'></div>
      <div className='hero-content text-center text-neutral-content'>
        <div className='max-w-md'>
          <h1 className='mb-5 text-3xl font-bold text-white'>
            Elevate your stay with savory solutions
          </h1>
          <p className='mb-5 text-white'>
            Where comfort meets cuisine for a thriving university life.
          </p>
          <div>
            <input
              className='text-black input input-bordered'
              type='text'
              placeholder='Search Meals'
              name='searchJobs'
            />
            <button className='btn btn-primary text-white'>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
