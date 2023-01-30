import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Client from "./components/Client";
import Server from "./components/Server";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");

function App() {
  const [stateAll, setStateAll] = React.useState<boolean>(true);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/clients"
            element={
              <Client
                socket={socket}
                stateAll={stateAll}
                setStateAll={setStateAll}
              />
            }
          />
          <Route
            path="/servers"
            element={
              <Server
                socket={socket}
                stateAll={stateAll}
                setStateAll={setStateAll}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
