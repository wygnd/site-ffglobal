import React from "react";
import Navbar from "@/components/navbar/Navbar";

const Header = () => {

  // console.log(process.env.SERVER_URL);

  return (
    <header>
      This header
      <Navbar />
      <hr/>
    </header>
  );
};

export default Header;