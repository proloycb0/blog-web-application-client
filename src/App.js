import { Box } from '@mui/material';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Navbar from './pages/Shared/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Login/Signup';
import RequireAuth from './pages/Login/RequireAuth';

function App() {
  return (
    <Box>
      <Navbar/>
      <Routes>
        <Route path='/' element={<RequireAuth><Home /></RequireAuth>}/>
        <Route path='login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
      <ToastContainer />
    </Box>
  );
}

export default App;
