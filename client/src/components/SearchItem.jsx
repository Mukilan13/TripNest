import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem border-[1px] border-[solid] border-[lightgray] p-[10px] rounded-[5px] flex justify-between gap-[20px] mb-[20px]">
      <img
        src={item.photos[0]}
        alt=""
        className="siImg w-[200px] h-[200px] object-cover"
      />
      <div className="siDesc flex flex-col gap-[10px] flex-[2_1]">
        <h1 className="siTitle text-[20px] text-[#F5385D]">{item.name}</h1>
        {/* <span className="siDistance text-[12px]">
          {item.distance}m from center
        </span> */}
        <span className="siTaxiOp text-[12px] bg-[#008009] text-[white] w-max p-[3px] rounded-[5px]">
          Free airport taxi
        </span>
        <span className="siSubtitle text-[12px] font-bold">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures text-[12px]">{item.description}</span>
        <span className="siCancelOp text-[12px] text-[#008009] font-bold">
          Free cancellation{" "}
        </span>
        <span className="siCancelOpSubtitle text-[12px] text-[#008009]">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails flex-[1_1] flex flex-col justify-between">
        {item.rating && (
          <div className="siRating flex justify-between">
            <span className="font-medium">Excellent</span>
            <button className="bg-[#c1121f] text-[white] p-[5px] font-bold border-[none]">
              {item.rating}
            </button>
          </div>
        )}
        <div className="siDetailTexts text-right flex flex-col gap-[5px]">
          <span className="siPrice text-2xl">₹{item.cheapestPrice}</span>
          <span className="siTaxOp text-[12px] text-gray-500">
            Includes taxes and fees
          </span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton bg-[#F5385D] text-[white] font-bold px-3 py-[10px] border-[none] cursor-pointer rounded-[5px]">
              See availability
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
