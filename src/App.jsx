import { useState, useRef, useEffect } from 'react'
import './styles.css'
import superagent from 'superagent';
import { API_KEY } from './api_key';

function strToObj(str) {
  var obj = {};
  if (str && typeof str === 'string') {
    var objStr = str.match(/\{(.)+\}/g);
    eval("obj =" + objStr);
  }
  return obj
}

function App() {
  const [city, setCity] = useState("London");
  const [country, setCountry] = useState("");
  const [temp, setTemp] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [feel, setFeel] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const inputRef = useRef();

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&APPID=" + API_KEY +
    "&units=metric";

  useEffect(() => {

    superagent.get(url).then((res) => {
      var data = strToObj(res.text);

      var temp = data.main.temp;
      temp = Math.floor(temp);
      setTemp(temp + " °C");

      var country = ", " + data.sys.country;
      setCountry(country);

      var desc = data.weather[0].description;
      setDesc(desc);

      var icon = data.weather[0].icon;
      var image = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
      setImage(image);

      var feel = data.main.feels_like
      feel = Math.floor(feel);
      setFeel(feel + " °C");

      var humidity = data.main.humidity;
      setHumidity(humidity + "%");

      var windSpeed = data.wind.speed
      setWindSpeed(windSpeed + " KPH")

      var maxTemp = data.main.temp_max
      setMaxTemp("↑ " + maxTemp + " °C")

      var minTemp = data.main.temp_min
      setMinTemp("↓ " + minTemp + " °C")

    }).catch(() => {
      setTemp("");
      setCountry("");
      setDesc("");
      setImage("");
      setFeel("0");
      setHumidity("0");
      setWindSpeed("0");
      setMaxTemp("");
      setMinTemp("");
      setCity("wrong city name.");
    })

  }, [city]);

  function changeCity(e) {
    if (e.key === "Enter") {
      setCity(inputRef.current.value);
    }
  }

  return (
    <div className="App font-display max-w-4xl h-[100vh] overflow-hidden m-auto text-4xl
                    child:w-[92%] child:mx-auto child:text-left text-center">
      <input type="text" placeholder="London..." className="p-4 bg-white/[.05] outline-none placeholder:text-white/10
                                    border-x-0 border-b-4 border-indigo-700 focus:border-indigo-500 transition-[border] mb-10"
        onKeyPress={changeCity} ref={inputRef} />

      <p className="text-md mb-8">{city} {country}</p>

      <p className="text-8xl font-bold">{temp}</p>

      <p className="text-3xl font-bold"><span className="text-red-500 max-temp">{maxTemp}</span> <span className="text-blue-500 min-temp">{minTemp}</span></p>

      <p className="text-4xl mb-5">{desc}</p>

      <div className="text-left">
        <img src={image} className="bg-white/50 rounded-xl shadow-2xl" />
      </div>

      <div className="bg-white/[0.2] m-auto absolute bottom-5 left-0 right-0 w-[92%] rounded-lg 
                      flex text-base max-w-3xl
                      child:flex-1 child:text-center child:p-3 flex-wrap overflow-hidden">
        <div className="hover:bg-indigo-300/[0.2] transition-colors">
          <p className="font-bold">{feel}</p>
          <p className="font-extralight">Feels Like</p>
        </div>
        <div className="hover:bg-indigo-300/[0.2] transition-colors">
          <p className="font-bold">{humidity}</p>
          <p className="font-extralight">humidity</p>
        </div>
        <div className="hover:bg-indigo-300/[0.2] transition-colors">
          <p className="font-bold">{windSpeed}</p>
          <p className="font-extralight">Wind Speed</p>
        </div>
      </div>
    </div>
  )
}

export default App;
