import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Explore from './pages/Explore';
import Offers from './pages/Offers';  
import Profile from './pages/Profile';    
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPasword from './pages/ForgotPasword';

function App() {
  return (
   <>
  <Router>
    <Routes>
      <Route path='/' element={<Explore/>} />
      <Route path='/profile' element={<SignIn/>} />
      <Route path='/offers' element={<Offers/>} />
      <Route path='/signin' element={<SignIn/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/forgot-password' element={<ForgotPasword/>} />
    </Routes>
  </Router>
   </>
  );
}

export default App;
