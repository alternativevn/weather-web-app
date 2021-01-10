import React from "react";

const Header = (props) => {
  return (
    <div>
      <div
        className="align-center"
        style={{
          gap: "10px",
          fontSize: "30px",
        }}
      >
        <img
          style={{ width: "40px" }}
          alt="app-logo"
          src="https://cdn.dribbble.com/users/915711/screenshots/5827243/weather_icon3.png"
        ></img>
        <p>Weather App</p>
      </div>
      <br></br>
      <div
        className="align-center"
        style={{
          gap: "20px",
        }}
      >
        <img
          style={{ cursor: "pointer", width: "30px" }}
          alt="location access"
          onClick={() => props.getUserLocation()}
          src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"
        ></img>
        <input
          style={{ borderRadius: "5px", padding: "5px" }}
          placeholder="Enter the location"
          onKeyPress={(e) =>
            e.key === "Enter" && e.target.value !== ""
              ? props.getLocation(e)
              : null
          }
        ></input>
      </div>
      <p className="not-found">
        {props.errorLoading ? "Something went wrong" : null}
      </p>
    </div>
  );
};

export default Header;
