import { Link } from 'react-router-dom'

// styles
import './Navbar.css'
import logo from '../assets/hq.svg'

export default function Navbar() {
  return (
    <div className='navbar'>
      <ul>
          <li className="logo">
              <img src={logo} alt="hq-logo" />
              <span>Headquarters</span>
          </li>

          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          <li>
              <button className="btn">Logout</button>
          </li>
      </ul>  
    </div>
  )
}