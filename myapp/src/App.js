import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Rent from './components/Rent';
import Upload from './components/Upload';
import AllImages from './components/AllImages';
import Signin from './components/Signin';
import Signup from './components/Signup';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <div className="container">
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/rentdevices" element={<Rent />} />
          <Route path="/uploadimages" element={<Upload />} />
          <Route path="/allimages" element={<AllImages />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
