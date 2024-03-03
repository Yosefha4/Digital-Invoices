import "./App.css";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import { Route, Routes, useParams } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import InvoiceItem from "./components/InvoiceItem";
import Auth from "./components/Auth";

function App() {
  const { user_id } = useParams();

  console.log("User Id: " + user_id)
  const userToken = sessionStorage.getItem("token");

  // console.log("user token: " + userToken);

  // const AuthComponents = () => {
  //   return (
  //     <>
  //       <Route path="/homepage" element={<Homepage />} />
  //       <Route path="/userProfile/:userId" element={<UserProfile />} />
  //       <Route path="/invoice/:invoiceId" element={<InvoiceItem />} />
  //       <Route path="/auth" element={<Auth />} />
  //     </>
  //   );
  // };

  return (
    <div className="App">
      <header>
        <Navbar />
      </header>

      {userToken ? (
        <Routes>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/" element={<Auth />} />
          <Route path="/userProfile/:userId" element={<UserProfile />} />
          <Route path="/invoice/:invoiceId" element={<InvoiceItem />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
      )}
      {/* <Routes>
      <Route path='/homepage' element={   <Homepage />}/>
      <Route path='/' element={   <Auth />}/>
      <Route path='/userProfile/:userId' element={   <UserProfile />}/>
      <Route path='/invoice/:invoiceId' element={   <InvoiceItem />}/>
    </Routes> */}
      {/* <h1>Welcome To Digital-Invoice!</h1> */}
    </div>
  );
}

export default App;
