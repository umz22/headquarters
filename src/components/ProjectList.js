import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import { useAuthContext } from '../hooks/useAuthContext'

// styles
import './ProjectList.css'

export default function ProjectList({ projects }) {
    // grab user information via useAuthContext
    const { user } = useAuthContext()

    return (
        <div className='project-list'>
            {projects.length === 0 && <p>No projects yet...click "New Project" to start working on something cool!</p>}

                {projects.map(project => (
                <Link to={`/project/${project.id}`} key={project.id}>
                    <h4>{project.name}</h4>
                    <p>Due by {project.dueDate.toDate().toDateString()}</p>
                    <div className="assigned-to">
                        <ul>
                            {project.assignedUsersList.map(user => (
                                <li key={user.photoURL}>
                                    <Avatar src={user.photoURL} />
                                    {/* <p>{user.displayName}</p> */}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Link>
            ))}
        </div>
    )
}
