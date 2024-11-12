import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_API_URL}/hotels/room/${hotelId}`
  );
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          console.log(
            `${import.meta.env.VITE_API_URL}/rooms/availability/${roomId}`
          );
          const res = axios.put(
            `${import.meta.env.VITE_API_URL}/rooms/availability/${roomId}`,
            {
              dates: alldates,
            }
          );
          return res.data;
        })
      );
      setOpen(false);
      navigate("/")
    } catch (err) {}
  };

  return (
    <div className="reserve w-screen h-screen bg-[rgba(0,0,0,0.4)] fixed top-[0] left-[0] flex items-center justify-center">
      <div className="rContainer bg-[white] rounded-[10px] p-[20px] relative">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose absolute top-[10px] right-[10px] cursor-pointer text-[#c1121f] text-xl"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div
            className="rItem flex items-center gap-[50px] p-[20px]"
            key={item._id}
          >
            <div className="rItemInfo flex flex-col gap-[5px]">
              <div className="rTitle font-medium">{item.title}</div>
              <div className="rDesc font-light">{item.description}</div>
              <div className="rMax text-sm">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice font-medium">{item.price}</div>
            </div>
            <div className="rSelectRooms flex flex-wrap gap-[5px] text-[8px] text-[gray]">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room flex flex-col">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={handleClick}
          className="rButton border-[none] px-[20px] py-[10px] bg-[#F5385D] text-[white] font-bold cursor-pointer rounded-[5px] w-full mt-[20px]"
        >
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
