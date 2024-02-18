import './App.css';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import { Route, Routes, useParams } from "react-router-dom";
import UserProfile from './components/UserProfile';

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
    </Routes>
    {/* <h1>Welcome To Digital-Invoice!</h1> */}
    </div>
  );
}

export default App;
