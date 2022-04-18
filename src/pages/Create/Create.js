import { useEffect, useState } from 'react'
import Select from 'react-select'
import { Timestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';

// hooks
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'

// styles
import './Create.css'


const categories = [  
  { value: 'planning', label: 'Planning' },
  { value: 'design', label: 'Design' },
  { value: 'development', label: 'Development' },
  { value: 'testing', label: 'Testing' },
]

export default function Create() {
  // form field values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)

  const navigate = useNavigate();
  const { user } = useAuthContext()
  const { addDocument, response } = useFirestore('projects')

  const { documents } = useCollection('users')
  // we have to convert the set of "documents" data from the useCollection
  // into an array (below) so that we can map that array into the 
  // "Assign to" drop down menu
  const [users, setUsers] = useState([])
  // this useEffect first fires once when the 'documents' are 'null,
  // then fires again once the documents have been fetched from the back end
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
    if (assignedUsers.length < 1) {
      setFormError('Please assign the project to at least 1 user')
      return
    }

    // The reason we create this is because the original assignedUsers array from the
    // <Select> components contain a ton of un-needed information, we simply filter out all
    // the informatio we need into the following:
    const assignedUsersList = assignedUsers.map(u => {
      return { 
        displayName: u.value.displayName, 
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })

    const createdBy = {
      // these values are grabbed from the user property from useAuthContext
      displayName: user.displayName, 
      photoURL: user.photoURL,
      id: user.uid
    }
    
    // this is the document that will ultimately get saved to the firestore db
    const project = {
      name: name,
      details: details,
      category: category.value,
      // we create the timestamp in the firebase config:
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      // later we are going to allow users to comment on posts, 
      // so this needs to be blank to start
      comments: [],
      createdBy: createdBy,
      assignedUsersList
    }
    
    // console.log(project)
    await addDocument(project)
    // this response.error is from useFirestore to track the error dispatch
    if (!response.error) {
      navigate('/')
    }
  }

  return (
    <div className='create-form'>
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>

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

        {/* Project Details */}
        <label>
          <span>Project Details:</span>
          <textarea
            required
            type="text"
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
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
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>

        {/* Assign to */}
        <label>
          <span>Assign to:</span>
          <Select
            onChange={(option) =>
              setAssignedUsers(option)
            }
            options={users}
            isMulti
          />
        </label>

        <button className="btn">Add Project</button>
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}
