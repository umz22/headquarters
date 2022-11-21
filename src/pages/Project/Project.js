import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import ProjectComments from './ProjectComments'
import ProjectSummary from './ProjectSummary'

// styles
import './Project.css'

export default function Project() {
  const { id } = useParams()
  const { error, document } = useDocument('projects', id)

  // This is an alternative to doing:
  // {error && <div>{error}</div>}
  if (error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
    return <div className='loading'>Loading ⌛...</div>
  }

  return (
    <div className='project-details'>
      <ProjectSummary project={document}/>
      <ProjectComments project={document}/>
    </div>
  )
}
