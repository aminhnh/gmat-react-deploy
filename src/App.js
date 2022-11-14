import "./App.css";
import Map from "./Map.js";
import { io } from "socket.io-client";
import { useEffect } from "react";

function App() {
  useEffect(function () {
    const socket = io("https://gmat-backend.herokuapp.com/");

    socket.on("DATA", function (payload) {
      console.log(payload);
    });
  });
  return (
    <div className="App">
      <h2>GMAT Software Programmer Instership Final Project</h2>
      <h3>
        Aminah Nurul Huda <br></br> 22/494455/SV/20830
      </h3>
      <Map />
    </div>
  );
}

export default App;
