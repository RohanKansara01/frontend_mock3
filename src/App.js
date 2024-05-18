import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ChakraProvider>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
          </Routes>
        </ChakraProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
