import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Explore from './pages/Explore';
import Offers from './pages/Offers';  
import Profile from './pages/Profile';    
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPasword from './pages/ForgotPasword';
import Navbar from './components/Navbar';

function App() {
  return (
   <>
  <Router>
    <Routes>
      <Route path='/' element={<Explore/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/offers' element={<Offers/>} />
      <Route path='/signin' element={<SignIn/>} />
      <Route path='/sign-up' element={<SignUp/>} />
      <Route path='/forgot-password' element={<ForgotPasword/>} />
    </Routes>
    <Navbar/>
  </Router>
   </>
  );
}

export default App;
