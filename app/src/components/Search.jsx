import React from "react";

const Search = () => {
  return (
    <div className="search">
      <div className="search-form">
        <input
          type="text"
          placeholder="Find a user"
        />
      </div>
      <div className="user-chat">
        <img
          src="https://images.pexels.com/photos/13355622/pexels-photo-13355622.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
          alt=""
        />
        <div className="user__chat--info">
          <span>name</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
