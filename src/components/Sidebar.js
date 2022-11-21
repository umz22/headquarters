import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Avatar from './Avatar'
import { useAuthContext } from '../hooks/useAuthContext'

// styles
import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import MenuIcon from '../assets/menu.svg'

export default function Sidebar() {
    const { user } = useAuthContext()
    const [open, setOpen] = useState(false)

    return (
        <div className={open ? "sidebar" : "collapsed"}> 
        <div className="sidebar-content">
          <div className='hamburgerIcon'>
            <img 
              src={MenuIcon} 
              alt="menu hamburger" 
              style={{cursor: 'pointer'}}
              onClick={() => setOpen(prev => !prev)}
              />
          </div>
          <div className="user">
            <Avatar src={user.photoURL} />
            {open && <p>Hey {user.displayName}</p>} 
          </div>  
          <nav className="links">
            <ul>
              <li>
                <NavLink exact to="/">
                  <img src={DashboardIcon} alt="dashboard icon" />
                  {open && <span>Dashboard</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/create">
                  <img src={AddIcon} alt="add project icon" />
                  {open && <span>New Project</span>}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

      </div>
    )
}



{/* <motion.div className="sidebar-content">
{/* ----User Info------ */}
{/* <motion.div className="user">
    {user.photoURL && <Avatar src={user.photoURL} />}
    <p>Hey {user.displayName}</p>
</motion.div> */}

{/* -----Links------- */}
{/* <motion.nav className="links">
    <ul>
        <li>
            <NavLink to="/">
                <img src={DashboardIcon} alt="Dashboard icon" />
                <span>Dashboard</span>
            </NavLink>
        </li>
        <li>
            <NavLink to="/create">
                <img src={AddIcon} alt="add project icon" />
                <span>New Project</span>
            </NavLink>
        </li>
    </ul>  */}