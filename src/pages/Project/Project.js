import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'

// styles
import './Project.css'
import ProjectSummary from './ProjectSummary'



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
      <ProjectSummary
        project={document}
      />
    </div>
  )
}
