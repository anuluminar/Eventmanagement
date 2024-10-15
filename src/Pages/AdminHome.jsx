import React, { useContext } from 'react'
import './Pages.css'
import AdminFooter from '../Components/AdminFooter'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthTokenContext } from '../ContextShare/Context'

function AdminHome() {

  const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext)

  const navigate = useNavigate()

  const logout = () => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    setIsAuthToken(false)
    navigate('/')
  }
  return (
    <>
      <div className='admin-bg' >
        <div style={{ float: "right" }} className='m-4'>
          <button onClick={logout} className='btn text-light' style={{ backgroundColor: "rgba(0, 0, 0, 0.491)" }}>Logout <i class="fa-solid fa-arrow-right-from-bracket"></i></button>
        </div>
        <div className='d-flex justify-content-center align-items-center flex-column'>
          <h2 className='mt-5 fw-bold ' style={{marginLeft:'60px'}}>Welcome Admin !!</h2>
          <p style={{marginLeft:'60px'}}>Elevate Your Administrative Experience</p>
        </div>
        <div className='d-flex justify-content-center align-items-center ' style={{ marginRight: '100px' }}>
          <Link to={'/add-event'}><button className='btn btn-danger ms-3'>EVENTS</button></Link>
          <Link to={'/view-bookings'}><button className='btn btn-danger ms-3'>BOOKINGS</button></Link>
        </div>
      </div>
      <AdminFooter />
    </>
  )
}

export default AdminHome