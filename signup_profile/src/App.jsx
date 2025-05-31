import { useState } from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/signUp';
import Profile from './components/profile';
import Header from './components/Header';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router basename="/accio_dummy_auth">
       <Header />
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Signup />} />

        {/* Other routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
