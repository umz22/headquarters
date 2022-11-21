import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';

// hooks
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'

// styles
import './Project.css'


export default function AssignEdit({project}) {

    // useStates
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError, setFormError] = useState(null)
    const [users, setUsers] = useState([])

    // hooks
    const navigate = useNavigate(); 
    const { user } = useAuthContext()
    const { updateDocument, response } = useFirestore('projects')
    const { documents } = useCollection('users')
    console.log(users)



    useEffect(() => {
        if(project) {
          setAssignedUsers(project.assignedUsersList.map(users => {
            return { value: {...users, id: users.id}, label: users.displayName }
          }))
        }

        if(documents) {
          setUsers(documents.map(user => {
            return { value: {...user, id: user.id}, label: user.displayName }
          }))
        }


      }, [documents])

      const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(assignedUsers)
        setFormError(null)
    

        if (assignedUsers.length < 1) {
          setFormError('Please assign the project to at least 1 user')
          return
        }
    
        // The reason we create this is because the original assignedUsers array from the
        // <Select> components contain a ton of un-needed information, we simply filter out all
        // the informatio we need into the following:
        const assignedUsersList = assignedUsers.map(u => {
          return {  
            // displayName: u.label
            displayName: u.value.displayName,
            photoURL: u.value.photoURL,
            id: u.value.id,
        }
        })

        // These are all the user Ids associated with the given project. Firestore has a tough time
        // reading sub categories within an array, so we create a simpler array consisting only of 
        // user IDs (assigned users + the user.uid that created it). We then use this simple array
        // to write out firestore.rules and the query rules
        const assignedUsersIds = assignedUsersList.map(users => (
          users.id
        ))
        assignedUsersIds.push(user.uid)
    
      
        // this is the document that will ultimately get saved to the firestore db
        const projectUpdate = {
          assignedUsersList: assignedUsersList,
          assignedUsersIds 
        }
    
        console.log(projectUpdate)
    
        await updateDocument(project.id, 
          projectUpdate)
    
        if (!response.error) {
          navigate('/')
        }
      }

      var b1 = users
      var b2 = assignedUsers
      
      var result = b1.filter(item1 => 
      !b2.some(item2 => (item2.value.id === item1.value.id)))
      
      console.log(result);

  return (
    <div>
        <h2 className="project-edit-title">Edit Assigned Users</h2>
        <form className='projectEdit' >
            {/* Assign to */}
              <label>
                  <span>Assign to:</span>
                  <Select
                      value={assignedUsers}
                      onChange={(option) =>
                          setAssignedUsers(option)
                      }
                      options={result}
                      isMulti
                  />
              </label>   
        </form>
        <button onClick={handleSubmit} className="btn">Save Changes</button>
    </div>
  )
}
