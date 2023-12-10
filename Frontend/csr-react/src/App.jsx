import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Principal from './principal';
import Deteccion from './deteccion';

function App () {
    
    return (
      <Routes>
        <Route path = "/" element={<Principal />} />
        <Route path = "/deteccion" element={<Deteccion />} />
      </Routes>
    );
}
export default App;