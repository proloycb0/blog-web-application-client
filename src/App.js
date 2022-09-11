
import { Box } from '@mui/material';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Navbar from './pages/Shared/Navbar';

function App() {
  return (
    <Box>
      <Navbar/>
      <Home/>
      <Login/>
    </Box>
  );
}

export default App;
