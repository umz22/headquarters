import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// styles
import './App.css';

// pages
import Dashboard from './pages/Dashboard/Dashboard';
import Create from './pages/Create/Create'
import Login from './pages/Login/Login';
import Project from './pages/Project/Project'
import Signup from './pages/Signup/Signup';
import Sidebar from './components/Sidebar';


function App() {
  return (
    <div className="App">
      <Sidebar/>
      <div className='container'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/create' element={<Create />} />
          <Route path='/project/:id' element={<Project />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;


