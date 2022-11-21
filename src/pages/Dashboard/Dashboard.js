import React, {useState} from 'react'
import { useCollection } from '../../hooks/useCollection'
import ProjectList from '../../components/ProjectList'
import { useAuthContext } from '../../hooks/useAuthContext'
import ProjectFilter from './ProjectFilter'

// styles
import './Dashboard.css'


export default function Dashboard() {
  const [currentFilter, setCurrentFilter] = useState('all')  
  const {user} = useAuthContext()
  const { documents, error } = useCollection('projects', user.uid )

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  const projects = documents ? documents.filter((document) => {
    switch (currentFilter) {
      case 'all': 
        return true
      case 'mine': 
        let assignedToMe = false
        document.assignedUsersList.forEach((u) => {
          if (user.uid === u.id) {
            assignedToMe = true
          }
        })
        return assignedToMe
      // If any of the following get switched, 
      // then return the currentFilter=document.category
      case 'planning':
      case 'design':
      case 'development':
      case 'testing':
        console.log(document.category, currentFilter)
        return document.category === currentFilter
      default:
        return true
    }
  }) : null
  // ^if there are documents, return all that logic in const projects...else return 'null'


  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents &&
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter} />
      }
      {documents &&
        <ProjectList 
          projects={projects} />
      }
    </div>
  )
}
