import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';

// styles
import './App.css';

// pages
import Dashboard from './pages/Dashboard/Dashboard';
import Create from './pages/Create/Create'
import Login from './pages/Login/Login';
import Project from './pages/Project/Project'
import Signup from './pages/Signup/Signup';
import Sidebar from './components/Sidebar';
import OnlineUsers from './components/OnlineUsers';


function App() {
  const { user, authIsReady } = useAuthContext()


  return (
    <div className="App">
      {authIsReady && (
        <>
          {/* we add conditional statement here for Sidebar because when you log out, the 
          code attempts to read the avatar and username in the sidebar while they are 'null'
          which causes errors*/}
          {user && <Sidebar />}
          <div className='container'>
            <Navbar />
            <Routes>
              {/* Dashboard */}
              {!user && <Route path='/' element={<Login />} />}
              {user && <Route path='/' element={<Dashboard />} />}

              {/* Create */}
              {!user && <Route path='/create' element={<Login />} />}
              {user && <Route path='/create' element={<Create />} />}

              {/* Project */}
              {!user && <Route path='/project/:id' element={<Login />} />}
              {user && <Route path='/project/:id' element={<Project />} />}

              {/* Login */}
              {!user && <Route path='/login' element={<Login />} />}
              {user && <Route path='/login' element={<Dashboard />} />}

              {/* Sign Up */}
              {!user && <Route path='/signup' element={<Signup />} />}
              {user && <Route path='/signup' element={<Dashboard />} />}
            </Routes>
          </div>
          {user && <OnlineUsers/>}
        </>
      )}
    </div>
  );
}

export default App;


