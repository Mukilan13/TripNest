import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Featured from "../components/Featured";
import PropertyList from "../components/PropertList";
import FeaturedProperties from "../components/FeaturedProperties";
import MailList from "../components/MailList";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="home-container mt-[50px] flex flex-col items-center gap-[30px]">
        <Featured />
        <h1 className="homeTitle w-[1024px] text-3xl font-bold">
          Explore by Property Type
        </h1>
        <PropertyList />
        <h1 className="homeTitle  w-[1024px] text-3xl font-bold">
          Guest's Favorite Homes
        </h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
