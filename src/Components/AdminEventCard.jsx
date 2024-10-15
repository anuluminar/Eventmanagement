import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { base_URL } from '../API/base_URL';
import EditEvent from './EditEvent';
import { deleteEventAPI, getAllEventAPI } from '../API/api';
import { editEventUserResponseContext, viewEventResponseContext } from '../ContextShare/Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminFooter from './AdminFooter';


function AdminEventCard() {
  

  const { editEventResponse, setEditEventResponse } = useContext(editEventUserResponseContext)

  const { addeventResponse, setaddeventRespone } = useContext(viewEventResponseContext)

  const [viewEvent, setViewEvent] = useState([])


  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await deleteEventAPI(id, header)
      if (result.status === 200) {
        toast.success('Deleted SuccessFully..')
        getallEvents()
      }
      else {
        console.log(result.response.data)
      }
    }
  }

  const getallEvents = async () => {
    const token = sessionStorage.getItem("token")
    const header = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await getAllEventAPI(header)
    setViewEvent(result.data)
  }
  console.log(viewEvent);

  useEffect(() => {
    getallEvents()
  }, [addeventResponse, editEventResponse])


  return (
  <>
      <Container>
        <Row className='mt-5 d-flex justify-content-center align-items-center' >
          {viewEvent?.length > 0 ?
            viewEvent?.map((events) => (
              <Col md={3} className='me-5 shadow mb-5' style={{ width: '300px' }}>
                <div className='d-flex justify-content-center align-items-center p-2'>
                  <img src={events ? `${base_URL}/Uploads/${events.image}` : null} style={{ height: "270px", width: "270px" }} alt="" />
                </div>
                <Container>
                  <div className='mt-2 ' style={{ height: '50px' }}><h3 className='text-danger text-center'>{events.title}</h3></div>
                  <div className='row shadow mt-3' style={{ height: '60px' }}>
                    <div className='col-md-2 mt-1'>
                      <h5 className='text-warning mt-2'><i class="fa-solid fa-location-dot"></i></h5>
                    </div>
                    <div className='col-md-10 mt-1'>
                      <a className='mt-2 text-success' href={events.locationUrl} style={{ textDecoration: 'none', color: "black" }}><h5> {events.location}</h5></a>
                    </div>
                  </div>
                  <div className='row shadow mt-3' >
                    <div className='col-md-2'>
                      <h5 className='text-warning mt-2'><i class="fa-solid fa-calendar-days me-1"></i></h5>
                    </div>
                    <div className='col-md-10'>
                      <h5 className='mt-2'>{events.date}</h5>
                    </div>
                  </div>
                  <div className='row shadow mt-3'>
                    <div className='col-md-2'>
                      <h5 className='text-warning mt-2'><i class="fa-solid fa-clock me-1"></i></h5>
                    </div>
                    <div className='col-md-10'>
                      <h5 className='mt-2'>{events.time}</h5>
                    </div>
                  </div>
                  <div className='d-flex justify-content-center align-items-center mt-3'>
                    <button className='btn btn-warning w-100' style={{height:'40px'}}><p className='fw-bold'>₹{events.amount}/-</p></button>
                  </div>
                  <div className='container d-flex justify-content-center align-items-center mt-3 mb-3'>
                    <button onClick={(e) => handleDelete(events?._id)} className='btn btn-danger '><i class="fa-solid fa-trash fa-1x"></i></button>
                    <EditEvent editevent={events} />
                  </div>
                </Container>
              </Col>
            ))
            : <p className='text-center text-danger fs-1'>No Events To Display....</p>
          }
        </Row>
      
        <ToastContainer position='top-center' theme='dark' autoClose={2000} />
  
      </Container>
      <AdminFooter/>
  </>
  )
}

export default AdminEventCard