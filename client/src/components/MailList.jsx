const MailList = () => {
  return (
    <div className="mail w-full mt-[50px] bg-[#c1121f] text-[white] flex flex-col items-center gap-[20px] p-[50px]">
      <h1 className="mailTitle text-4xl font-bold">Save time, save money!</h1>
      <span className="mailDesc">
        Sign up and we'll send the best deals to you
      </span>
      <div className="mailInputContainer">
        <input type="text" placeholder="Your Email" className="w-[300px] h-[30px] py-6 px-4 text-black border-[none] outline-none mr-[10px] rounded-[5px]" />
        <button className="h-[50px] bg-[#F5385D] text-[white] font-medium border-[none] px-3 rounded-[5px] cursor-pointer">Subscribe</button>
      </div>
    </div>
  );
};

export default MailList;