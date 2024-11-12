import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div className="header flex justify-center w-full bg-[#c1121f] text-white relative">
      <div
        className={
          type === "list"
            ? "header-container w-full max-w-[1024px] mt-5"
            : "header-container w-full max-w-[1024px] mt-5 mb-24"
        }
      >
        <div className="header_list flex gap-10 mb-12">
          <div className="header_list_item active flex gap-3 items-center">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem flex gap-3 items-center">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem flex gap-3 items-center">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem flex gap-3 items-center">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem flex gap-3 items-center">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="header_title text-3xl font-bold">
              A lifetime of discounts? That's{" "}
              <span className="font-medium underline underline-offset-4">
                TripNest.
              </span>
            </h1>
            <p className="header_desc my-5">
              Earn rewards for every journey – enjoy instant savings of 10% or
              more with a free Lamabooking account
            </p>
            {!user && (
              <button className="header_btn bg-[#F5385D] p-2 rounded-[5px]">
                Sign in / Register
              </button>
            )}
            <div className="headerSearch h-[30px] bg-white flex items-center justify-between pl-6 pr-[0.3rem] py-6 absolute -bottom-6 w-[90%] max-w-screen-lg rounded-[5px] border-[3px] border-solid border-[#F5385D]">
              <div className="headerSearchItem flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faBed}
                  className="headerIcon text-[rgb(211,211,211)]"
                />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput border-none outline-none !text-black"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem flex items-center gap-3 text-[rgb(211,211,211)]">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText cursor-pointer"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem flex items-center gap-3 text-[rgb(211,211,211)] cursor-pointer">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="options absolute top-[50px] z-10 bg-white text-gray-500 rounded-[5px] shadow-lg">
                    <div className="optionItem w-[200px] flex justify-between m-3">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter flex items-center gap-3 text-[12px] text-black">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton w-8 h-8 border-[1px] border-[#F5385D] border-solid text-[#F5385D]"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton w-8 h-8 border-[1px] border-[#F5385D] border-solid text-[#F5385D]"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem w-[200px] flex justify-between m-3">
                      <span className="optionText">Children</span>
                      <div className="optionCounter flex items-center gap-3 text-[12px] text-black">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton w-8 h-8 border-[1px] border-[#F5385D] border-solid text-[#F5385D]"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton w-8 h-8 border-[1px] border-[#F5385D] border-solid text-[#F5385D]"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem w-[200px] flex justify-between m-3">
                      <span className="optionText">Room</span>
                      <div className="optionCounter flex items-center gap-3 text-[12px] text-black">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton w-8 h-8 border-[1px] border-[#F5385D] border-solid text-[#F5385D]"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton w-8 h-8 border-[1px] border-[#F5385D] border-solid text-[#F5385D]"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem flex items-center gap-3 text-white bg-[#F5385D] px-3 py-2 rounded-[3px]">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
