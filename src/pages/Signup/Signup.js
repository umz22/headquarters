import { useState } from 'react'

// styles
import './Signup.css'


export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [username, setUsername] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const [passErrorMsg, setPassErrorMsg] = useState(null)

  const handleFileChange = (e) => {
    setThumbnail(null)
    // e.target.files returns an array of files, 0 returns the first one in that array
    let selected = e.target.files[0]
    console.log(selected)

    // if file was simply not selected
    if (!selected) {
      setThumbnailError('Please select a file')
      return
    }
    // if the file type doesn't include image
    if (!selected.type.includes('image')) {
      setThumbnailError('Selected file must be an image')
      return
    }
    // if the fule type doesn't meet the size requirement
    if (selected.size > 100000) {
      setThumbnailError('Image file size must be less than 100kb')
      return
    }

    setThumbnailError(null)
    setThumbnail(selected)
    console.log('thumbnail updated')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPass) {
        setPassErrorMsg('Password confirmation does not match')
        setPassword('')
        setConfirmPass('')
        // console.log('passwords dont match')
    } else {
      // setPassErrorMsg('Password matched')
      console.log(email, password, username, thumbnail)
      setPassErrorMsg('')
  }
}

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>
      <label>
        <span>Confirm Password:</span>
        <input
          type="password"
          onChange={(e) => setConfirmPass(e.target.value)}
          value={confirmPass}
          required
        />
      </label>
      {passErrorMsg && <div className='error'>{passErrorMsg}</div>}
      <label>
        <span>Username:</span>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />
      </label>
      <label>
        <span>Profile Thumbnail:</span>
        <input
          type="file"
          required
          onChange={handleFileChange}
        />
        {thumbnailError && <div className='error'>{thumbnailError}</div>}
      </label>
      <button className='btn'>Sign Up</button>
    </form>
  )
}
