import { NavLink } from 'react-router-dom'
import Avatar from './Avatar'
import { useAuthContext } from '../hooks/useAuthContext'

// styles
import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'


export default function Sidebar() {
    // grab user information via useAuthContext
    const { user } = useAuthContext()


    return (
        <div className='sidebar'>
            <div className="sidebar-content">
                <div className="user">
                    {user.photoURL && <Avatar src={user.photoURL} />}
                    <p>Hey {user.displayName}</p>
                </div>
                <nav className="links">
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
                    </ul>
                </nav>
            </div>
        </div>
    )
}
