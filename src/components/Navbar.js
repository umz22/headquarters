import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'


// styles
import './Navbar.css'
import logo from '../assets/hq.svg'

export default function Navbar() {
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()

  return (
    <div className='navbar'>
      <ul>
          <li className="logo">
              <img src={logo} alt="hq-logo" />
              <span>Headquarters</span>
          </li>
          {!user && <li><Link to="/login">Login</Link></li>}
          {!user && <li><Link to="/signup">Signup</Link></li>}
          {user && (
          <li>
              {/* if isPending=false, then show logout btn */}
              {!isPending && <button className="btn" onClick={logout}>Logout</button>}

              {/* if isPending=true, then show loading btn */}
              {isPending && <button className="btn" disabled>logging out...</button>}
          </li>
          )}
      </ul>  
    </div>
  )
}
