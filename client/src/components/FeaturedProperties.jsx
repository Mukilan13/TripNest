import useFetch from "../hooks/useFetch";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_API_URL}/hotels?featured=true&limit=4`
  );

  return (
    <div className="fp w-full max-w-screen-lg flex justify-between gap-[20px]">
      {loading ? (
        "Loading ..."
      ) : (
        <>
          {data.map((item) => (
            <div
              key={item._id}
              className="fpItem flex-[1_1] gap-[10px] flex flex-col"
            >
              <img
                src={item.photos[0]}
                alt={item.name}
                className="fpImg w-full h-[250px] object-cover rounded-[5px]"
              />
              <span className="fpName text-[#333] font-bold">{item.name}</span>
              <span className="fpCity font-light capitalize">{item.city}</span>
              <span className="fpPrice font-medium">
                Starting from ₹{item.cheapestPrice}
              </span>
              <div className="fpRating">
                <button className="bg-[#c1121f] text-[white] border-[none] p-[3px] mr-[10px] font-bold">
                  {item.rating?.toFixed(1)}
                </button>
                <span className="text-sm">Excellent</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;

{
  /* <div className="fpItem flex-[1_1] gap-[10px] flex flex-col">
        <img
          src=""
          alt=""
          className="fpImg w-full h-[250px] object-cover rounded-[5px]"
        />
        <span className="fpName text-[#333] font-bold">
          Comfort Suites Airport
        </span>
        <span className="fpCity font-light">Austin</span>
        <span className="fpPrice font-medium">Starting from ₹1400</span>
        <div className="fpRating">
          <button className="bg-[#c1121f] text-[white] border-[none] p-[3px] mr-[10px] font-bold">
            9.3
          </button>
          <span className="text-sm">Exceptional</span>
        </div>
      </div>
      <div className="fpItem flex-[1_1] gap-[10px] flex flex-col">
        <img
          src=""
          alt=""
          className="fpImg w-full h-[250px] object-cover rounded-[5px]"
        />
        <span className="fpName text-[#333] font-bold">Four Seasons Hotel</span>
        <span className="fpCity font-light">Lisbon</span>
        <span className="fpPrice font-medium">Starting from ₹2000</span>
        <div className="fpRating">
          <button className="bg-[#c1121f] text-[white] border-[none] p-[3px] mr-[10px] font-bold">
            8.8
          </button>
          <span className="text-sm">Excellent</span>
        </div>
      </div>
      <div className="fpItem flex-[1_1] gap-[10px] flex flex-col">
        <img
          src=""
          alt=""
          className="fpImg w-full h-[250px] object-cover rounded-[5px]"
        />
        <span className="fpName text-[#333] font-bold">Hilton Garden Inn</span>
        <span className="fpCity font-light">Berlin</span>
        <span className="fpPrice font-medium">Starting from ₹2150</span>
        <div className="fpRating">
          <button className="bg-[#c1121f] text-[white] border-[none] p-[3px] mr-[10px] font-bold">
            8.9
          </button>
          <span className="text-sm">Excellent</span>
        </div>
      </div> */
}
