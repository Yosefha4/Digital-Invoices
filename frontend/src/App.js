import "./App.css";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import InvoiceItem from "./components/InvoiceItem";
import Auth from "./components/Auth";
import Subs from "./components/Subs";

function App() {
  const { user_id } = useParams();

  const userToken = sessionStorage.getItem("token");

 

  return (
    <div className="App">
      <header>
        <Navbar />
      </header>

      {userToken  ? (
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/" element={<Auth />} /> */}
          <Route path="/userProfile/:userId" element={<UserProfile />} />
          <Route path="/invoice/:invoiceId" element={<InvoiceItem />} />
          <Route path="/subscribers" element={<Subs />} />

        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
      )}
       {/* Redirect unauthenticated users to login */}
       {!userToken && <Navigate to="/" />}
    </div>
  );
}

export default App;
