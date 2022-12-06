import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="user">
        <img
          src="https://images.pexels.com/photos/13677413/pexels-photo-13677413.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
          alt="user"
        />
        <span>John</span>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
