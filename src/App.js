import { Box, Stack } from '@mui/material';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Navbar from './pages/Shared/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Login/Signup';
import RequireAuth from './pages/Login/RequireAuth';
import Blogs from './pages/Home/Blogs';
import Archive from './pages/Home/Archive';
import Trash from './pages/Home/Trash';
import Sidebar from './pages/Home/Sidebar';
import RightBar from './pages/Home/RightBar';

function App() {
  return (
    <Box>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <Routes>
          <Route path='/' element={<RequireAuth><Home /></RequireAuth>}/>
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/archive' element={<Archive />} />
          <Route path='/trash' element={<Trash />} />

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
        <RightBar/>
      </Stack>
      <ToastContainer />
    </Box>
  );
}

export default App;
