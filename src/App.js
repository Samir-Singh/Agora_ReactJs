import { Route, Routes, useNavigate } from "react-router-dom";
import ConnectForm from "./components/ConnectForm";

import "./App.css";
import Call from "./components/Call";

function App() {
  const navigate = useNavigate();

  const handleConnect = (channelName) => {
    navigate(`/via/${channelName}`); // on form submit, navigate to new route
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<ConnectForm connectToVideo={handleConnect} />}
      />
      <Route path="/channel/:channelName" element={<Call />} />
    </Routes>
  );
}

export default App;
