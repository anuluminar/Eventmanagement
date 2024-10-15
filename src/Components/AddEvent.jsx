import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './Component.css'
import { addEventAPI } from '../API/api';
import AdminEventCard from './AdminEventCard';
import { viewEventResponseContext, viewEventUserResponseContext } from '../ContextShare/Context';
import Swal from 'sweetalert2';

function AddEvent() {


    const { addeventResponse, setaddeventRespone } = useContext(viewEventResponseContext)

    const { viewEventResponse, setViewEventResponse } = useContext(viewEventUserResponseContext)

    const [preview, setPreview] = useState("")

    const [event, setEvent] = useState({
        image: "",
        title: "",
        location: "",
        locationUrl: "",
        date: "",
        time: "",
        amount: ""
    })

    const [token, setToken] = useState("")

    useEffect(() => {
        if (event.image) {
            setPreview(URL.createObjectURL(event.image))
        }
        else {
            setPreview("")
        }
    }, [event.image])


    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
        else {
            setToken("")
        }
    }, [])



    const upload = async (e) => {
        e.preventDefault()
        const { image, title, location, locationUrl, date, time, amount } = event
        if (!image || !title || !location || !locationUrl || !date || !time || !amount) {
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Please Fill the Form Completely..!!",
                showConfirmButton: false,
                timer: 1500,
                height:'40px'
              });
        }
        else {
            //body
            //create object for formData since we have uploaded content
            const body = new FormData()
            // //add data to formData -- append
            body.append("image", image)
            body.append("title", title)
            body.append("location", location)
            body.append("locationUrl", locationUrl)
            body.append("date", date)
            body.append("time", time)
            body.append("amount", amount)

            //header
            if (token) {
                const header = {
                    "Content-Type": "multipart/form-data"
                }

                const result = await addEventAPI(body, header)
                console.log(result);
                if (result.status === 200) {
                    // toast.success('Event Uploaded Successfully..!')
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Event Uploaded Successfully..!",
                        showConfirmButton: false,
                        timer: 1500,
                        height:'40px'
                      });
                    setaddeventRespone(result.data)
                    setViewEventResponse(result.data)
                    handleClose()
                }
                else {
                    // toast.error(result.response.data)
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: result.response.data,
                        showConfirmButton: false,
                        timer: 1500,
                        height:'40px'
                      });
                }
            }
        }
    }
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        handleClose1()
    }
    const handleShow = () => setShow(true);


    const handleClose1 = () => {
        setEvent({
            image: "",
            title: "",
            location: "",
            locationUrl: "",
            date: "",
            time: "",
            amount: ""
        })
    }
    return (
        <>
            <div className='add-event-bg'>
                <div className='add-event d-flex justify-content-center align-items-center'>
                    <button className='btn rounded mt-5 w-50' style={{ backgroundColor: 'orangered' }} onClick={handleShow}>Upload Events</button>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        centered
                    >
                        <Modal.Header closeButton>
                            <h2 className='text-danger text-center mt-2 fw-bolder'>Upload Events</h2>
                        </Modal.Header>
                        <Modal.Body>
                            <label htmlFor='profile' className='justify-content-center align-items-center d-flex mt-2 mb-3'>
                                <input onChange={(e) => setEvent({ ...event, image: e.target.files[0] })} className='mt-3 mb-4' id='profile' type="file" style={{ marginLeft: '100px', display: 'none' }} />
                                <img className='shadow' src={preview ? preview : "https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg"} alt="no image" style={{ height: '200px', width: '200px' }} />
                            </label>
                            <input type="text" value={event.title} onChange={(e) => setEvent({ ...event, title: e.target.value })} placeholder='Event Title' className='form-control mb-2 mt-1' />
                            <input type="text" value={event.location} onChange={(e) => setEvent({ ...event, location: e.target.value })} placeholder='Event Location' className='form-control mb-2 mt-1' />
                            <input type="text" value={event.locationUrl} onChange={(e) => setEvent({ ...event, locationUrl: e.target.value })} placeholder='Event Location Url' className='form-control mb-2 mt-1' />
                            <input type="date" value={event.date} onChange={(e) => setEvent({ ...event, date: e.target.value })} placeholder='Event Date' className='form-control mb-2 mt-1' />
                            <input type="text" value={event.time} onChange={(e) => setEvent({ ...event, time: e.target.value })} placeholder='Event Time' className='form-control mb-2 mt-1' />
                            <input type="text" value={event.amount} onChange={(e) => setEvent({ ...event, amount: e.target.value })} placeholder='Event Amount' className='form-control mb-2 mt-1' />
                        </Modal.Body>
                        <div className=' d-flex justify-content-center align-items-center mb-3 ms-2 me-2'>
                            <Button variant="success" onClick={upload} className='me-2 w-50'>Upload</Button>
                            <Button variant="danger" className='w-50' onClick={handleClose1}>Cancel</Button>
                        </div>
                    </Modal>
                </div>
                <AdminEventCard />
            </div>

            {/* <ToastContainer position='top-center' theme='colored' autoClose={2000} /> */}
        </>
    )
}

export default AddEvent