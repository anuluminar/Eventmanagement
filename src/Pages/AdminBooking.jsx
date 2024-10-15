import React, { useContext, useEffect, useState } from 'react'
import {Col,Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import AdminFooter from '../Components/AdminFooter';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { adminviewbook, bookdeleteadmin } from '../ContextShare/Context';
import { adminviewbookings, deleteadminEventAPI } from '../API/api';
import { base_URL } from '../API/base_URL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminBooking() {

  const [searchkey, setSearchkey] = useState("")

  const {viewbook, setviewbook}=useContext(adminviewbook)

  const [bookingsdetails,setbookingdetails]=useState([])

  const {deleteadminbook, setdeleteadminbook}=useContext(bookdeleteadmin)

  const getbooks=async()=>{
    const token=sessionStorage.getItem("token")
    const header = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    if(token){
      const result=await adminviewbookings(searchkey,header)
      // console.log(result);
      setbookingdetails(result.data)
    }
  }
  // console.log(bookingsdetails);

  const deleteEvent=async(id)=>{
    const token=sessionStorage.getItem("token")
    const header = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    if(token){
      const result=await deleteadminEventAPI(id,header)
      // console.log(result);
      toast.success('Deleted Successfully..')

      setdeleteadminbook(result.data)
    }
  }

  useEffect(()=>{
    getbooks()
  },[viewbook,searchkey,deleteadminbook])

  return (
    <>
      <h2 className='text-center text-danger mt-5 mb-3'>View User Bookings</h2>
      <div className='d-flex justify-content-center align-items-center'>
      <FloatingLabel
        controlId="floatingInput"
        label="Search"
        className="mb-3 w-50"
      >
        <Form.Control value={searchkey} onChange={e => setSearchkey(e.target.value)} type="email" placeholder="Search" />
      </FloatingLabel>
      </div>
      <Row className='ms-5 me-5 mb-5'>
        {bookingsdetails?.length>0?
        bookingsdetails?.map((bookings)=>(
          <Col md={4}>
          <div style={{ width: '30rem', height: '19rem'}} className='mt-2 mb-2 ms-2 shadow '>
            <div className='d-flex'>
              <Card.Img className='p-2 mt-5' style={{ height: '200px', width: '200px' }} variant="right" src={bookings ? `${base_URL}/Uploads/${bookings.image}` : null} />

              <Card.Body className='ms-3'>
                <h5 className='mt-5 mb-2'>User Name : <span className='text-danger'>{bookings.username} </span></h5>
                <Card.Text>
                  <p>{bookings.title}</p>
                  <p>no : of bookings : {bookings.quantity}</p>
                  <p>location : {bookings.location}</p>
                  <p>{bookings.date} | {bookings.time}</p>
                  <button className='btn btn-danger ms-5' onClick={(e)=>deleteEvent(bookings?._id)}><i class="fa-solid fa-trash"></i></button>
                </Card.Text>
              </Card.Body>
            </div>
          </div>
         

        </Col>
        )) 
      : <div className='d-flex justify-content-center align-items-center' style={{height:'60vh'}}><h4 className='text-danger text-center  fw-bold ' >NO BOOKINGS YET TO DISPLAY ‼️</h4></div>  
      }
      </Row>
      <AdminFooter/>
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />

    </>
  )
}

export default AdminBooking