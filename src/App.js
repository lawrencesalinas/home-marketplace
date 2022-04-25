import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Explore from './pages/Explore';
import Offers from './pages/Offers';  
import Category from './pages/Category';
import Profile from './pages/Profile';    
import PrivateRoute from './components/PrivateRoute';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPasword from './pages/ForgotPasword';
import Navbar from './components/Navbar';
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import TItle from './components/TItle';
import Contact from './pages/Contact';

function App() {
  return (
   <>
  <Router>
  <TItle/>
    <Routes>
     
      <Route path='/' element={<Explore/>} />
      <Route path='/offers' element={<Offers/>} />
      <Route path='/category/:categoryName' element={<Category/>} />
      <Route path='/profile' element={<PrivateRoute/>} >
        <Route path='/profile' element={<Profile/>} />
     </Route>

      <Route path='/sign-in' element={<SignIn/>} />
      <Route path='/sign-up' element={<SignUp/>} />
      <Route path='/forgot-password' element={<ForgotPasword/>} />
      <Route path='/create-listing' element={<CreateListing/>} />
      <Route path='/category/:categoryName/:listingId' element={<Listing/>} />
      <Route path='/contact/:landlordId' element={<Contact/>} />



    </Routes>
    <Navbar/>
  </Router>

  <ToastContainer/>
   </>
  );
}

export default App;
