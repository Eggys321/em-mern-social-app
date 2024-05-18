import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import ResetPassword from './auth/ResetPassword';
import Home from './pages/Home.jsx';
import { Toaster } from 'react-hot-toast';
import Community from './pages/Community.jsx';
import SingleUserProfile from './pages/SingleUserProfile.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/signin' element={<SignIn />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/community' element={<Community/>}/>
          <Route path='/resetpassword' element={<ResetPassword />}/>
          <Route path='/singleuserprofile/:userId'  element={<SingleUserProfile/>} />
        </Routes>
      </BrowserRouter>
      <Toaster/>

    </>
  );
}

export default App;

{
  /* <Route element={<NavBar cartItem = {cartItem}/>}>
<Route path='/' element={<Home />} />
<Route path='/CheckOut' element={<CheckOut />} />
</Route> */
}
