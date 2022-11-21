import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import ProjectDetails from '../Create/ProjectDetails'
import { useNavigate } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore'

// hooks
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'

// styles
import './Project.css'

const categories = [  
  { value: 'planning', label: 'Planning' },
  { value: 'design', label: 'Design' },
  { value: 'development', label: 'Development' },
  { value: 'testing', label: 'Testing' },
]

export default function ProjectEdit({project}) {

  // The following initial useStates needs to be reformated into strings:

  // dueDate
  var date = new Date(project.dueDate.toDate().toDateString())
  var formatDate = date.toISOString().split('T')[0]

  // category
  // console.log(project.category.value)
  // const categoryString = project && project.category.value[0].toUpperCase() + project.category.value.slice(1).toLowerCase();

  
  // assignedUsers
  const assignedUserNames = project.assignedUsersList.map(users => (
    {label: users.displayName}
  ))



    const [name, setName] = useState(project.name)
    const [details, setDetails] = useState(project.details)
    const [dueDate, setDueDate] = useState(formatDate)
    const [category, setCategory] = useState(project.category)
    const [formError, setFormError] = useState(null)
    
    const navigate = useNavigate(); 
    const { user } = useAuthContext()
    const { updateDocument, response } = useFirestore('projects')
    const { documents } = useCollection('users')
    const [users, setUsers] = useState([])
  
    useEffect(() => {
      if(documents) {
        setUsers(documents.map(user => {
          return { value: {...user, id: user.id}, label: user.displayName }
        }))
      }
    }, [documents])

    // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    if (!category) {
      setFormError('Please select a project category')
      return
    }

    // These are all the user Ids associated with the given project. Firestore has a tough time
    // reading sub categories within an array, so we create a simpler array consisting only of 
    // user IDs (assigned users + the user.uid that created it). We then use this simple array
    // to write out firestore.rules and the query rules
  //   const assignedUsersIds = assignedUsersList.map(users => (
  //     users.id
  // ))
      // assignedUsersIds.push(user.uid)


    const createdBy = {
      // these values are grabbed from the user property from useAuthContext
      displayName: user.displayName, 
      photoURL: user.photoURL,
      id: user.uid,
    }
  
    // this is the document that will ultimately get saved to the firestore db
    const projectUpdate = {
      name: name,
      details: details,
      category: category.value,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      // later we are going to allow users to comment on posts, 
      // so this needs to be blank to start
      comments: [],
      createdBy: createdBy,
      // assignedUsersList: [...project.assignedUsersList, assignedUsers],
      // assignedUsersIds 
    }

    console.log(projectUpdate)

    await updateDocument(project.id, 
      projectUpdate)

    if (!response.error) {
      navigate('/')
    }
  }


  return (
    <div >
    <h2 className="project-edit-title">Edit your project</h2>
    <form className='projectEdit' onSubmit={handleSubmit}>

    <div className='modal-col'>
      {/* Project Name */}
      <label>
        <span>Project Name:</span>
        <input
          required
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>

      {/* Project Due Date */}
      <label>
        <span>Project Due Date:</span>
        <input
          required
          type="date"
          onChange={(e) => setDueDate(e.target.value)}
          value={dueDate}
        />
      </label>

        {/* Project Category */}
        <label>
          <span>Project Category:</span>
          <Select
            defaultValue={{ label: category}}
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>
        </div>
        <div className='modal-col-2'>
        <ProjectDetails
            setDetails={setDetails}
            details={details}
        />
        </div>    
    </form>
    <button className="btn">Save Changes</button>

 
  </div>
  )
}
