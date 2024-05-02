import { Route, Routes, useNavigate } from "react-router-dom";
import ConnectForm from "./components/ConnectForm";

import "./App.css";
import Call from "./components/Call";
import AgoraRTC, { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";

function App() {
  const navigate = useNavigate();

  const handleConnect = (channelName) => {
    navigate(`/via/${channelName}`); // on form submit, navigate to new route
  };

  const client = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );

  return (
    <Routes>
      <Route
        path="/"
        element={<ConnectForm connectToVideo={handleConnect} />}
      />
      <Route
        path="/channel/:channelName"
        element={
          <AgoraRTCProvider client={client}>
            <Call />
          </AgoraRTCProvider>
        }
      />
    </Routes>
  );
}

export default App;
