import { useEffect, useState } from 'react';
import axios from 'axios';
//Components
import Navigation from './components/Navigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserContextProvider } from '../utils/UserContext';
import Search from './pages/Search';
import Room from './pages/Room';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserContextProvider>
          <div className="py-6 px-6">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="Search" element={<Search />} />
              <Route path="room/:id" element={<Room />} />

              {/* <Route path="login" element={<Login />} /> */}
            </Routes>
          </div>
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
