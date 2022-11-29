import * as React from 'react';
import {  BrowserRouter,  Routes,  Route,  Link} from "react-router-dom";
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import NotFound from './components/NotFound';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function App() {
  return (
    <div className="App">

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <BrowserRouter>
        <Routes>
          <Route path="/" element={<Customerlist />} />
          <Route path="/traininglist" element={<Traininglist />} />
          <Route path="*" element={<NotFound />} />
       </Routes>
            </BrowserRouter>
          </Typography>
        </Toolbar>
      </AppBar>
      </Box>
    </div>
  );
}

export default App;
