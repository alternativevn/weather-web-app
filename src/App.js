import { useEffect, useState } from "react";
import "./App.css";
import React from "react";
import Header from "./Header";
import LocationInfo from "./LocationInfo";
import SwitchButton from "./SwitchButton";

function App() {
  const [location, setLocation] = useState({});
  const [degreeFormat, setDegreeFormat] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deviceLocation, setDeviceLocation] = useState([]);
  const [errorLoading, setErrorLoading] = useState(false);
  const [hour, setHour] = useState("");

  const api = (v) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${v}&appid=e558ce954b9561590022dc1c954b0b7d&units=metric`;
  const myInit = { mode: "cors" };
  const myRequest = (v) => new Request(api(v), myInit);

  const toggleFormat = () => setDegreeFormat(!degreeFormat);

  // clock
  setInterval(() => {
    var date = new Date();
    setHour(
      date.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
  }, 1000);

  function getUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const ps = [
        Math.round(position.coords.latitude),
        Math.round(position.coords.longitude),
      ];
      setDeviceLocation(ps);
    });
  }

  useEffect(() => {
    if (deviceLocation.length !== 0) {
      fetchResults();
    }
  }, [deviceLocation]);

  async function fetchResults() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${deviceLocation[0]}&lon=${deviceLocation[1]}&appid=e558ce954b9561590022dc1c954b0b7d&units=metric`,
        myInit
      );
      if (!response.ok) {
        throw new Error("bad network request");
      }
      const data = await response.json();
      setLocation(data);
      setErrorLoading(false);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setErrorLoading(true);
      console.error(e);
    }
  }

  async function getLocation(e) {
    setIsLoading(true);
    try {
      const response = await fetch(myRequest(e.target.value));
      if (!response.ok) {
        throw new Error("bad network request");
      }
      const data = await response.json();
      setLocation(data);
      e.target.value = "";
      setIsLoading(false);
      setErrorLoading(false);
    } catch (e) {
      setErrorLoading(true);
      setIsLoading(false);
      console.error(e);
    }
  }

  async function getInitLocation() {
    setIsLoading(true);
    try {
      const response = await fetch(api("Hanoi"), myInit);
      if (!response.ok) {
        throw new Error("bad network request");
      }
      const data = await response.json();
      setErrorLoading(false);
      setLocation(data);
      setIsLoading(false);
    } catch (e) {
      setErrorLoading(true);
      setIsLoading(false);
      console.error(e);
    }
  }

  useEffect(() => {
    getInitLocation();
  }, []);

  return (
    <div>
      <div className="App">
        <Header
          errorLoading={errorLoading}
          getUserLocation={getUserLocation}
          getLocation={getLocation}
        />
        {isLoading ? (
          <p style={{ fontSize: "40px" }}>Loading ...</p>
        ) : (
          <div>
            <LocationInfo degreeFormat={degreeFormat} location={location} />
            <SwitchButton
              toggleFormat={() => toggleFormat()}
              degreeFormat={degreeFormat}
            />
            <p>{hour}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
