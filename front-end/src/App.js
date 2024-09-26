import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import AllRoutes from './AllRoutes';
import { useState } from 'react';

function App() {
  const [slideIn, setslideIn] = useState(false)

  const handleSlidein=() => {
    setslideIn(!slideIn);
  }

  return (
    <div className="App">
     <Router>
      <AllRoutes slideIn={slideIn} handleSlidein={handleSlidein}/>
     </Router>
    </div>
  );
}

export default App;
