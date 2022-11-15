import "./App.css";
import Map from "./components/Map.js";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import Chart1 from "./components/Chart1.js";

function App() {
  // useEffect(function () {
  //   const socket = io("https://gmat-backend.herokuapp.com/");
  //   socket.on("DATA", function (payload) {
  //     console.log(payload);
  //   });
  // });
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState();

  const [voltages, setVoltages] = useState([]);
  const [pressures, setPressures] = useState([]);
  const [clocks, setClocks] = useState([]);

  useEffect(
    function () {
      // if (socket) return;
      const socket = io("https://gmat-backend.herokuapp.com/");
      console.log("connected");
      setSocket(socket.io);
    },
    [socket]
  );

  useEffect(function () {
    if (!socket) return;
    socket.on("DATA", function (payload) {
      const dataArr = payload.slice(0, -1).split(",");

      const dataSensor = {
        TEAM_ID: dataArr[0],
        CLOCK: dataArr[1],
        YAW: Number(dataArr[2]),
        PITCH: Number(dataArr[3]),
        ROLL: Number(dataArr[4]),
        LATITUDE: Number(dataArr[5]),
        LONGITUDE: Number(dataArr[6]),
        VOLTAGE: Number(dataArr[7]),
        PRESSURE: Number(dataArr[8]),
        ALTITUDE: Number(dataArr[9]),
      };

      setVoltages((voltages) => [...voltages, dataSensor.VOLTAGE]);
      setPressures((pressures) => [...pressures, dataSensor.PRESSURE]);
      setClocks((clocks) => [...clocks, dataSensor.CLOCK]);

      setData(dataSensor);
    });
  });

  return (
    <div className="App">
      <h2>GMAT Software Programmer Instership Final Project</h2>
      <h3>
        Aminah Nurul Huda <br></br> 22/494455/SV/20830
      </h3>
      <div>
        <div className="MapClass">
          <Map className="MapClass" />
        </div>
        <div>
          <h2>Latitude: {data?.LATITUDE}</h2>
        </div>
      </div>
      <div className="flex-container">
        <div>
          <Chart1 data={voltages} label={clocks} title="Voltage" />
        </div>
        <div>
          <Chart1 data={pressures} label={clocks} title="Pressure" />
        </div>
      </div>
    </div>
  );
}

export default App;
