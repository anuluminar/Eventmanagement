import React, { useContext, useEffect, useState } from 'react'
import './Pages.css'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import { Dropdown } from 'react-bootstrap'
import { editUserContext, isAuthTokenContext } from '../ContextShare/Context'
import { getuserDetails } from '../API/api'
import { base_URL } from '../API/base_URL'

function Dashboard() {

  // const [preview,setPreview]=useState("")

  const [userDetails, setUserDetails] = useState({})

  const { viewEditResponse, setViewEditResponse } = useContext(editUserContext)

  const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext)

  const navigate = useNavigate()

  const [username, setUsername] = useState("")

  useEffect(() => {
    if(sessionStorage.getItem("token")){
      setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
    }
  }, [])

  const getProfile = async () => {
    const token = sessionStorage.getItem("token")
    if(token){
      const reqheader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await getuserDetails(reqheader)
    if (result.status === 200) {
      setUserDetails(result.data)
    }
    else {
      setUserDetails("")
    }
  }}

  useEffect(() => {
    getProfile()
  }, [viewEditResponse])


  const logout = () => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    setIsAuthToken(false)
    navigate('/')
  }

  return (
    <>
      <div className='dashboard-bgimage ' >
        <Dropdown style={{ height: '50px', width: '50px', borderRadius: '25px', marginLeft: '1400px' }}>
          <Dropdown.Toggle className='mt-2 me-2' style={{ backgroundColor: ' rgba(0, 0, 0, 0)', height: '50px', width: '50px', borderRadius: '25px', borderColor: 'rgba(0, 0, 0, 0)' }} id="dropdown-basic" >
            {userDetails?.length > 0 ?
              userDetails?.map((profile) => (
                <img style={{ height: '50px', width: '50px', borderRadius: '25px', marginRight: '10px' }} src={ profile.profile?`${base_URL}/Uploads/${profile.profile}`: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png" } alt="" />
              ))
              : <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png" alt="" />
            }
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/user-bookings">Your Bookings </Dropdown.Item>
            <Dropdown.Item href='/profile'>Edit Profile <i class="fa-solid fa-pen-nib" style={{ color: 'darkblue' }}></i></Dropdown.Item>
            <button className='btn ' onClick={logout}><Dropdown.Item href="#/action-2">Logout <i class="fa-solid fa-right-from-bracket " style={{ color: 'darkblue' }}></i></Dropdown.Item></button>
          </Dropdown.Menu>
        </Dropdown>
        <div className='d-flex justify-content-center align-items-center'>
          <b>
            <h1 className='text-center mt-5'>Welcome <span className='text-danger '>{username}</span></h1>
            <h5 className='text-center text-primary'>Spreading love and joy through the power of music </h5>
            <Link to={'/view-events'}><button className='btn btn-danger w-100'>EVENTS</button></Link>
          </b>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Dashboard