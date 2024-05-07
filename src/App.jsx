import { AppBar, Typography } from "@mui/material";
import "./App.css";
import { Link, Outlet, useLocation } from 'react-router-dom';


function App() {





  const location = useLocation();

  const isThisCalendarPage = location.pathname === '/calendar';




  return (
    <>
      <AppBar position="sticky" >
        <Typography variant='h6'>
          Personal training
        </Typography>
        <div className="App">
          <nav >
            <Link style={{ marginRight: '10px' }} to={"/"}>Home</Link>

            <Link style={{ marginRight: '10px' }} to={"/training"}>Training</Link>

            <Link style={{ marginRight: '10px' }} to={"/chart"}>Chart</Link>

            <Link style={{ marginRight: '10px' }} to={"/calendar"}>Calendar</Link>

            <Link style={{ marginRight: '10px' }} to={"/customer"}>customer</Link>
          </nav>
          <Outlet />
        </div>
      </AppBar>
    </>
  );
}

export default App;
