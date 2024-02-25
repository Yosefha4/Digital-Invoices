import './App.css';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import { Route, Routes, useParams } from "react-router-dom";
import UserProfile from './components/UserProfile';
import InvoiceItem from './components/InvoiceItem';

function App() {
  const {user_id} = useParams();
  return (
    <div className="App">
      <header>
      <Navbar />

      </header>
 
    <Routes>
      <Route path='/' element={   <Homepage />}/>
      <Route path='/userProfile/:userId' element={   <UserProfile />}/>
      <Route path='/invoice/:invoiceId' element={   <InvoiceItem />}/>
    </Routes>
    {/* <h1>Welcome To Digital-Invoice!</h1> */}
    </div>
  );
}

export default App;
