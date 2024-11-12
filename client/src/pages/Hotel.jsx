import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import MailList from "../components/MailList";
import Footer from "../components/Footer";
import useFetch from "../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import Reserve from "../components/Reserve";
import { AuthContext } from "../context/AuthContext";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const navigate = useNavigate();

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_API_URL}/hotels/find/${id}`
  );
  const { photos } = data;
  console.log(photos);

  const { user } = useContext(AuthContext);

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  // Calculate days only if `startDate` and `endDate` are valid
  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "Loading ..."
      ) : (
        <div className="hotelContainer flex flex-col items-center">
          {open && (
            <div className="slider sticky top-[0] left-[0] z-10 w-screen h-screen bg-[rgba(0,_0,_0,_0.613)] flex items-center">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close absolute top-[20px] right-[20px] text-[50px] text-[lightgray] cursor-pointer"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow m-[20px] text-[50px] text-[lightgray] cursor-pointer"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper w-full h-full flex justify-center items-center">
                <img
                  src={photos[slideNumber]}
                  alt=""
                  className="sliderImg w-4/5 h-[80vh]  rounded-[10px]"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow m-[20px] text-[50px] text-[lightgray] cursor-pointer"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper w-full max-w-screen-lg flex flex-col gap-[10px] relative pt-8">
            <button
              onClick={handleClick}
              className="bookNow absolute top-[10px] right-[0] border-[none] px-[20px] py-[10px] bg-[#F5385D] text-[white] font-bold rounded-[5px] cursor-pointer mt-5"
            >
              Reserve or Book Now!
            </button>
            <h1 className="hotelTitle text-2xl font-bold">{data.name}</h1>
            <div className="hotelAddress text-[12px] flex items-center gap-[10px]">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            {/* <span className="hotelDistance text-[#F5385D] font-medium">
              Excellent location – 500m from center
            </span> */}
            <span className="hotelPriceHighlight text-[#008009] font-medium">
              Book a stay over ₹{data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages flex flex-wrap justify-between gap-1">
              {photos &&
                photos.map((photo, i) => (
                  <div className="hotelImgWrapper w-[33%]" key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo}
                      alt=""
                      className="hotelImg w-full object-cover cursor-pointer"
                    />
                  </div>
                ))}
            </div>
            <div className="hotelDetails flex justify-between gap-[20px] mt-[20px]">
              <div className="hotelDetailsTexts flex-[3_1]">
                <h1 className="hotelTitle text-2xl font-bold">
                  Stay in the heart of City
                </h1>
                <p className="hotelDesc text-[14px] mt-5">{data.description}</p>
              </div>
              <div className="hotelDetailsPrice flex-[1_1] bg-[#ebf3ff] p-[20px] flex flex-col gap-[20px]">
                <h1 className="text-[18px] text-[#555]">
                  Perfect for a {days}-night stay!
                </h1>
                <span className="text-sm">
                  Located in the real heart of Krakow, this property has an
                  excellent location score of {data.rating}!
                </span>
                <h2 className="font-light text-2xl">
                  <b className="font-bold text-2xl">
                    ₹{days * data.cheapestPrice * options.room}
                  </b>{" "}
                  ({days} {days === 1 ? "night" : "nights"})
                </h2>
                <button
                  onClick={handleClick}
                  className="border-[none] px-[20px] py-[10px] bg-[#F5385D] text-[white] font-bold cursor-pointer rounded-[5px]"
                >
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
