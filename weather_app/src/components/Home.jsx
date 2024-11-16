import { useEffect, useState } from "react";
import styles from "../styles/home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureThreeQuarters,
  faTemperatureLow,
  faTemperatureHigh,
  faWind,
  faCompass,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";

export function Home() {
  const [weatherData, setWeatherData] = useState();
  const [data, setData] = useState({});
  const [windData, setWindData] = useState({});
  const [weather, setweather] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const [backgroundVideo, setBackgroundVideo] = useState(
    "/weather_app_background.mp4"
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    let location = document.getElementById("location").value;
    async function getData() {
      try {
        let response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=0c8ad3128f981928e8934de5e0264b44&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        setIsAvailable(false);
        setBackgroundVideo("/weather_app_background.mp4");
      }
    }
    getData();
  };
  useEffect(() => {
    if (weatherData) {
      setIsAvailable(true);
      setData(weatherData.main);
      setWindData(weatherData.wind);
      const currentWeather = weatherData.weather[0].main;
      if (currentWeather === "Haze" || currentWeather === "Mist") {
        setBackgroundVideo("/fog.mp4");
      } else if (currentWeather === "Rain") {
        setBackgroundVideo("/rain.mp4");
      } else if (currentWeather === "Clouds") {
        setBackgroundVideo("/clouds.mp4");
      } 
      else if(currentWeather==="Thunderstorm")
      {
        setBackgroundVideo("/thunderstorm.mp4");
      }
      else {
        setBackgroundVideo("/sunny.mp4");
      }
      setweather(weatherData.weather[0].main);
    }
  }, [weatherData]);
  return (
    <>
      {isAvailable ? (
        <>
          <div>
            <video
              autoPlay
              muted
              loop
              className={styles.backgroundVideo}
              key={backgroundVideo}
            >
              <source src={backgroundVideo} type="video/mp4" />
              Sorry your browser doesnot support videos.
            </video>
          </div>
          <div className={styles.header}>
            <h1 style={{ fontSize: 50 }}>Weather App</h1>
          </div>
          <div className={styles.searchBar}>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Location
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    plaintext
                    style={{
                      height: 50,
                      borderBottom: "4px solid white",
                      color: "white",
                    }}
                    id="location"
                  />
                </Col>
                <Col sm="2">
                  <Button
                    variant="info"
                    style={{ height: 50, fontWeight: "bold", width: 100 }}
                    type="submit"
                  >
                    search
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </div>
          <div className={styles.content}>
            <h1 style={{ textAlign: "center", color: "white", fontSize: 40 }}>
              Weather: {weather}
            </h1>
            <div className={styles.smallDivs}>
              <h3 style={{ textAlign: "center", fontSize: "30px" }}>
                Temperature{" "}
                <FontAwesomeIcon icon={faTemperatureThreeQuarters} fade />
              </h3>
              <p className={styles.smallDivContent}>
                <b>
                  Temperature{" "}
                  <FontAwesomeIcon icon={faTemperatureThreeQuarters} />:
                </b>{" "}
                {data.temp} <sup>o</sup>C
              </p>
              <p className={styles.smallDivContent}>
                <b>Fells Like:</b> {data.feels_like} <sup>o</sup>C
              </p>
              <p className={styles.smallDivContent}>
                <b>
                  Min. Temperature <FontAwesomeIcon icon={faTemperatureLow} />:
                </b>{" "}
                {data.temp_min} <sup>o</sup>C
              </p>
              <p className={styles.smallDivContent}>
                <b>
                  Max. Temperature <FontAwesomeIcon icon={faTemperatureHigh} />:
                </b>{" "}
                {data.temp_max} <sup>o</sup>C
              </p>
            </div>
            <div className={styles.smallDivs}>
              <h3 style={{ textAlign: "center", fontSize: "30px" }}>
                Pressure
              </h3>
              <p className={styles.smallDivContent}>
                <b>Pressure:</b> {data.pressure} hPa
              </p>
              <p className={styles.smallDivContent}>
                <b>Sea Level:</b> {data.sea_level} hPa
              </p>
              <p className={styles.smallDivContent}>
                <b>Ground Level:</b> {data.grnd_level} hPa
              </p>
            </div>
            <div className={styles.smallDivs}>
              <h3 style={{ textAlign: "center", fontSize: "30px" }}>
                Wind <FontAwesomeIcon icon={faWind} fade />
              </h3>
              <p className={styles.smallDivContent}>
                <b>Speed:</b> {windData.speed} m/s
              </p>
              <p className={styles.smallDivContent}>
                <b>
                  Direction <FontAwesomeIcon icon={faCompass} />:
                </b>{" "}
                {windData.deg} <sup>o</sup>
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <video autoPlay muted loop className={styles.backgroundVideo}>
              <source src={backgroundVideo} type="video/mp4" />
              Sorry your browser doesnot support videos.
            </video>
          </div>
          <div className={styles.header}>
            <h1>Weather App</h1>
          </div>
          <div className={styles.searchBar}>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Location
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    plaintext
                    style={{
                      height: 50,
                      borderBottom: "4px solid white",
                      color: "white",
                    }}
                    id="location"
                  />
                </Col>
                <Col sm="2">
                  <Button
                    variant="info"
                    style={{ height: 50, fontWeight: "bold", width: 100 }}
                    type="submit"
                  >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: 50,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Please Enter Location
          </div>
        </>
      )}
    </>
  );
}
