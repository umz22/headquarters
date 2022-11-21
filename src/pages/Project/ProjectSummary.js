import React, {useState} from 'react'
import Avatar from '../../components/Avatar'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import parse from 'html-react-parser';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Modal from '../../components/Modal'

// styles
import './Project.css'
import pencil from '../../assets/pencil.svg'
import ProjectEdit from './ProjectEdit'
import AssignEdit from './AssignEdit'

export default function ProjectSummary({ project }) {
    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const { deleteDocument } = useFirestore('projects')
    const { user } = useAuthContext()
    const navigate = useNavigate() 

    const handleClose = () => {
        setShowModal(false)
      }
    
    const handleClose2 = () => {
        setShowModal2(false)
      }

    const handleModal = () => {
        setShowModal(true)
    }

    const handleModal2 = () => {
        setShowModal2(true)
    }

    const handleClick = (e) => {
        deleteDocument(project.id)
        navigate('/')
    }


    return (
        <div>
            <div className="project-summary">
                <div className="edit-icon">
                    <img 
                        src={pencil} 
                        alt="edit icon" 
                        style={{cursor: 'pointer'}}
                        onClick={handleModal}
                    />
                </div>
                <h2 className="page-title">{project.name}</h2>
                <h4>Created by:</h4>
                <div className="assigned-users">
                    <div key={project.createdBy.id}>
                        <Avatar src={project.createdBy.photoURL} />
                    </div>
                </div>

                <p className="due-date">
                    Project due by {project.dueDate.toDate().toDateString()}
                </p>
                <p className="details">
                    {parse(project.details)}
                </p>

                <h4 className='assigned-to-border'>Assigned to:</h4>
                <div className="edit-icon">
                    <img 
                        src={pencil} 
                        alt="edit icon" 
                        style={{cursor: 'pointer'}}
                        onClick={handleModal2}
                    />
                </div>
                <div className="assigned-users">
                    {project.assignedUsersList.map(user => (
                        <div key={user.id}>
                            <Avatar src={user.photoURL} />
                        </div>
                    ))}
                </div>
                {user.uid === project.createdBy.id && (
                    <button className="btn" onClick={
                        // () => (deleteDoc(doc(db, 'projects', project.id)))
                        handleClick
                    }>Mark as Complete</button>
                )}
            </div>

            {showModal && <Modal handleClose={handleClose}>
                <ProjectEdit
                    project={project}
                />
            </Modal>}

            
            {showModal2 && <Modal handleClose={handleClose2}>
                <AssignEdit
                    project={project}
                />
            </Modal>}

        </div>
    )
}
