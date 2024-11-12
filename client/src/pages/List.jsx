import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import useFetch from "../hooks/useFetch";
import SearchItem from "../components/SearchItem";
import { SearchContext } from "../context/SearchContext";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const { dispatch } = useContext(SearchContext);

  const { data, loading, error, reFetch } = useFetch(
    `${
      import.meta.env.VITE_API_URL
    }/hotels?city=${destination.toLowerCase()}&min=${min || 0}&max=${
      max || 19999
    }`
  );

  const handleOptionsChange = (field, value) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [field]: value,
    }));

    dispatch({
      type: "UPDATE_OPTIONS",
      payload: { [field]: value },
    });
  };

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer flex justify-center mt-[20px]">
        <div className="listWrapper w-full max-w-screen-lg flex gap-[20px]">
          <div className="listSearch flex-[1_1] bg-[#c1121f] pb-3 pr-3 rounded-[10px] sticky top-[10px] h-max text-white">
            <h1 className="lsTitle mb-3 text-3xl font-semibold bg-[#F5385D] w-fit px-4 py-1 rounded-tl-[10px] rounded-br-[10px]">
              Search
            </h1>
            <div className="lsItem flex flex-col gap-[5px] mb-[10px] ml-3">
              <label className="text-sm">Destination</label>
              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                type="text"
                className="h-[30px] border-[none] p-[5px] rounded-[5px] border-none outline-none text-black"
              />
            </div>
            <div className="lsItem flex flex-col gap-[5px] mb-[10px] ml-3">
              <label className="text-sm">Check-in Date</label>
              <span
                className="bg-white p-[5px] rounded-[5px] text-black text-[14px]"
                onClick={() => setOpenDate(!openDate)}
              >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                dates[0].endDate,
                "MM/dd/yyyy"
              )}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem flex flex-col gap-[5px] mb-[10px] ml-3">
              <label className="text-sm">Options</label>
              <div className="lsOptions p-3">
                <div className="lsOptionItem flex justify-between mb-[10px] text-white text-[12px]">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput w-[50px] text-black pl-2 rounded-[3px]"
                  />
                </div>
                <div className="lsOptionItem flex justify-between mb-[10px] text-white text-[12px]">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput w-[50px] text-black pl-2 rounded-[3px]"
                  />
                </div>
                <div className="lsOptionItem flex justify-between mb-[10px] text-white text-[12px]">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput w-[50px] text-black pl-5 rounded-[3px]"
                    value={options.adult}
                    onChange={(e) =>
                      handleOptionsChange("adult", e.target.value)
                    }
                  />
                </div>
                <div className="lsOptionItem flex justify-between mb-[10px] text-white text-[12px]">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput w-[50px] text-black pl-5 rounded-[3px]"
                    value={options.children}
                    onChange={(e) =>
                      handleOptionsChange("children", e.target.value)
                    }
                  />
                </div>
                <div className="lsOptionItem flex justify-between mb-[10px] text-white text-[12px]">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput w-[50px] text-black pl-5 rounded-[3px]"
                    value={options.room}
                    onChange={(e) =>
                      handleOptionsChange("room", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleClick}
              className="w-[95%] bg-[#F5385D] ml-3 py-1 rounded-[3px]"
            >
              Search
            </button>
          </div>
          <div className="listResult flex-[3_1]">
            {loading ? (
              "Loading ..."
            ) : error ? (
              <p>Error loading data</p>
            ) : Array.isArray(data) ? (
              data.map((item) => <SearchItem item={item} key={item._id} />)
            ) : (
              <p>No results found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
