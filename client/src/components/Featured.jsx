import useFetch from "../hooks/useFetch";

const Featured = () => {
  const { data, loading, error } = useFetch(
    `${
      import.meta.env.VITE_API_URL
    }/hotels/countByCity?cities=chennai,kerala,telangana`
  );

  return (
    <div className="featured w-full max-w-screen-lg flex justify-between gap-[20px]">
      {loading ? (
        "Loading ..."
      ) : (
        <>
          <div className="featuredItem relative text-[white] rounded-[10px] overflow-hidden h-[250px] flex-[1_1]">
            <img
              src="https://www.shutterstock.com/shutterstock/videos/1050603658/thumb/1.jpg?ip=x480"
              alt=""
              className="featuredImg w-full h-full object-cover"
            />
            <div className="featuredTitles w-full h-[35%] absolute bottom-0 left-0 bg-[rgba(0,0,0,0.2)] px-3 rounded-[5px] backdrop-blur-[1px] pt-2">
              <h1 className="text-4xl font-bold">Chennai</h1>
              <h2 className="text-2xl font-bold">
                {data[0]} {data[0] === 1 ? "Property" : "Properties"}
              </h2>
            </div>
          </div>

          <div className="featuredItem relative text-[white] rounded-[10px] overflow-hidden h-[250px] flex-[1_1]">
            <img
              src="https://www.keralasoils.gov.in/sites/default/files/inline-images/kerala1.jpg"
              alt=""
              className="featuredImg w-full h-full object-cover"
            />
            <div className="featuredTitles w-full h-[35%] absolute bottom-0 left-0 bg-[rgba(0,0,0,0.2)] px-3 rounded-[5px] backdrop-blur-[1px] pt-2">
              <h1 className="text-4xl font-bold">Kerala</h1>
              <h2 className="text-2xl font-bold">
                {data[1]} {data[1] === 1 ? "Property" : "Properties"}
              </h2>
            </div>
          </div>
          <div className="featuredItem relative text-[white] rounded-[10px] overflow-hidden h-[250px] flex-[1_1]">
            <img
              src="https://www.abhibus.com/blog/wp-content/uploads/2023/03/charminar-hyderabad-entryfee-timings-tour-package-header-1-1024x512.jpg"
              alt=""
              className="featuredImg w-full h-full object-cover"
            />
            <div className="featuredTitles w-full h-[35%] absolute bottom-0 left-0 bg-[rgba(0,0,0,0.2)] px-3 rounded-[5px] backdrop-blur-[1px] pt-2">
              <h1 className="text-4xl font-bold">Telangana</h1>
              <h2 className="text-2xl font-bold">
                {data[2]} {data[2] === 1 ? "Property" : "Properties"}
              </h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
