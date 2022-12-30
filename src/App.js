import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './pages/About';
import Home from './pages/Home';
import Blog from './pages/Blog';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        {/* Si aucun chemin fonctionne, redirection vers la home grâce à '*' */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
