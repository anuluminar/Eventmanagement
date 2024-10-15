import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { eventbooked, getUserEventAPI } from '../API/api'
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { adminviewbook } from '../ContextShare/Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function Bookings() {
  const { viewbook, setviewbook } = useContext(adminviewbook)
  const [bookingevent, setBookingEvent] = useState([])
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState({
    quantity: 0,
    username:''
  })
  const [grandtotal, setGrandTotal] = useState(0)
  const [selectedEvent, setSelectedEvent] = useState(null)


  const getEvents = async () => {
    const token = sessionStorage.getItem("token")
    const header = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await getUserEventAPI(header)
    setBookingEvent(result.data)
  }
  // console.log(bookingevent);

  const handleEventChange = (e) => {
    const selectedTitle = e.target.value;
    const selected = bookingevent.find(item => item.title === selectedTitle);
    setSelectedEvent(selected);
    // console.log('selcted',e.target.value);
  };

  // console.log(selectedEvent);
    const combinedState = { ...selectedEvent, ...quantity, ...grandtotal }
  console.log(combinedState);


  const checkout = async (e) => {
    e.preventDefault()
    const token = sessionStorage.getItem("token")
    const header = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    if (token) {

      // const result = await eventbooked({ ...selectedEvent, quantity: quantity.quantity, ...grandtotal }, header);
      // console.log(result.data);
      if(!selectedEvent || !quantity || !grandtotal){
        toast.warning('Please Fill the Form Completely')
      }
      else{
        const result =await eventbooked(combinedState,header)
        setviewbook(result.data)
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Payment Successfull",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/user-bookings')
      }
      }
     
  }
  console.log(grandtotal);



  useEffect(() => {
    if (selectedEvent && quantity.quantity) {
      const grand = (selectedEvent.amount * quantity.quantity);
      setGrandTotal(grand);
    }
  }, [selectedEvent, quantity.quantity]);

  console.log(quantity);




  useEffect(() => {
    getEvents()
  }, [])

  return (
    <>

      <div className='container'>
        <Row className='d-flex justify-content-center align-items-center mt-5 shadow'>
          <Col md={6} className='book-bg' >
            <h1 className='mt-5 fw-bold text-center'><br />Book Our Upcoming <br /> Events And <br />Live life to the fullest <br /> <span className='text-primary'>Start exploring today.</span></h1>
          </Col>
          <Col md={6}>
            <h1 className='text-center fw-bold text-info'>BOOK TICKET</h1>
            <hr />
            <Row>
              <Col md={12}>
                <div className="form-group d-flex ms-5">
                  <label style={{ marginLeft: '85px' }} className=' mt-2'>Event Title : </label>
                  <select onChange={(e) => handleEventChange(e)} className='w-50  rounded form-control' style={{ marginLeft: '99px' }}>
                    <option value="">Select an option</option>
                    {bookingevent?.length > 0 ?
                      bookingevent?.map((event) => (
                        <option value={event.title}>{event.title}</option>
                      ))
                      :
                      <option value="option1">No Events</option>
                    }
                  </select>
                </div>
                <div className="form-group d-flex ms-5 mt-3">
                  <label style={{ marginLeft: '85px' }} className=' mt-2'>Username : </label>
                  <input onChange={(e)=>{setQuantity({...quantity,username:e.target.value})}} type='text' placeholder='Enter Username' className='form-control w-50 ' style={{marginLeft:'100px'}}/>
                </div>
                {/* <div className='mt-4 d-flex'>
                <label className='ms-5'>UserName : </label>
                  <input type="text" placeholder='Username' className='w-50 rounded form-control ' style={{ marginLeft: '208px' }}/>
                  </div> */}
                {selectedEvent && <h4 className='text-center mt-4 text-danger'>{selectedEvent.date} | {selectedEvent.time}</h4>}
                {selectedEvent && <h4 className='text-center mt-4 text-danger'>{selectedEvent.location}</h4>}
              </Col>
            </Row>
            <Row className='d-flex justify-content-center align-items-center container' style={{ marginLeft: '100px' }}>
              {/* <Col md={5} className='mt-4'>
                <h4 className='mt-4'>No : Of Tickets </h4>
              </Col> */}
              <Col md={12} className='d-flex mt-2'>
                {/* <input type="text" placeholder='1' className='form-control mt-4' style={{ height: '40px', width: '40px' }} /> */}
                <label className='mt-3 me-5'>No: Of Tickets</label>
                <input onChange={(e) => setQuantity({ ...quantity, quantity: e.target.value })} type="number" style={{ marginLeft: '38px' }} placeholder='Enter no: of Tickets' className='form-control w-50 rounded mt-3' min="1" max="50" />
              </Col>
            </Row>



            <Row className='d-flex justify-content-center align-items-center container' style={{ marginLeft: '100px' }}>
              <Col md={5} className='mt-4'>
                <h4 className='mt-4'>Amount</h4>
              </Col>
              <Col md={7} className='d-flex mt-4'>
                {selectedEvent && <h4 className='mt-4'>₹ {selectedEvent.amount * quantity.quantity}/- </h4>}
              </Col>
            </Row>

           {selectedEvent && <button className='btn btn-success mt-5 w-50' onClick={checkout} style={{ marginLeft: '170px' }}>PAY ₹ {selectedEvent.amount * quantity.quantity}/- </button>}

          </Col>

        </Row>

      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />

      {/* <PayPalScriptProvider
      options={{"client-id":{PAYPAL_CLIENT_ID}}}
      >

      </PayPalScriptProvider> */}

    </>
  )
}

export default Bookings