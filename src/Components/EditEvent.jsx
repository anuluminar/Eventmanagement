import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { base_URL } from '../API/base_URL';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { editEventAPI } from '../API/api';
import Swal from 'sweetalert2';
import { editEventUserResponseContext } from '../ContextShare/Context';

function EditEvent({ editevent }) {

    const { setEditEventResponse } = useContext(editEventUserResponseContext);

    const [preview, setPreview] = useState("")

    const [eventDetails, setEventDetails] = useState({
        id: editevent._id,
        image: "",
        title: editevent.title,
        location: editevent.location,
        locationUrl: editevent.locationUrl,
        date: editevent.date,
        time: editevent.time,
        amount: editevent.amount
    })

    const handleClose1 = () => {
        setEventDetails({
            id: editevent._id,
            image: "",
            title: editevent.title,
            location: editevent.location,
            locationUrl: editevent.locationUrl,
            date: editevent.date,
            time: editevent.time,
            amount: editevent.amount
        })
        setPreview("")
    }

    const Update = async () => {
        const { id, image, title, location, locationUrl, date, time, amount } = eventDetails
        if (!title || !location || !locationUrl || !date || !time || !amount) {
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Please Fill the Form Completely..!!",
                showConfirmButton: false,
                timer: 1500,
                height: '40px'
            });
        }
        else {
            const reqbody = new FormData()

            preview ? reqbody.append("image", image) : reqbody.append("image", editevent.image)
            reqbody.append("title", title)
            reqbody.append("location", location)
            reqbody.append("locationUrl", locationUrl)
            reqbody.append("date", date)
            reqbody.append("time", time)
            reqbody.append("amount", amount)

            const token = sessionStorage.getItem("token")
            if (preview) {
                const reqheader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result = await editEventAPI(id, reqbody, reqheader)
                console.log(result);
                if (token) {
                    if (result.status === 200) {
                        // toast.success('Updated Successfull')
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: "Updated Successfull",
                            showConfirmButton: false,
                            timer: 1500,
                            height: '40px'
                        });
                        setEditEventResponse(result.data)
                        handleClose()
                    }
                    else {
                        // toast.error(result.response.data)
                        Swal.fire({
                            position: "top",
                            icon: "success",
                            title: result.response.data,
                            showConfirmButton: false,
                            timer: 1500,
                            height: '40px'
                        });
                    }
                }
            }
            else {
                const reqheader = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
                const result = await editEventAPI(id, reqbody, reqheader)
                console.log(result);
                if (token) {
                    if (result.status === 200) {
                        // toast.success('Updated Successfull')
                        Swal.fire({
                            position: "top",
                            icon: "success",
                            title: "Updated Successfull",
                            showConfirmButton: false,
                            timer: 1500,
                            height: '40px'
                        });
                        setEditEventResponse(result.data)
                        handleClose()
                    }
                    else {
                        // toast.error(result.response.data)
                        Swal.fire({
                            position: "top",
                            icon: "success",
                            title: result.response.data,
                            showConfirmButton: false,
                            timer: 1500,
                            height: '40px'
                        });
                    }
                }

            }

        }
    }
    useEffect(() => {
        if (eventDetails.image) {
            setPreview(URL.createObjectURL(eventDetails.image))
        }
    }, [eventDetails.image])
    console.log(preview);

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        handleClose1()
    }
    const handleShow = () => setShow(true);
    return (
        <>
            <button onClick={handleShow} className='btn btn-dark ms-5'><i class="fa-solid fa-pen-nib fa-1x"></i></button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <h2 className='text-danger text-center mt-2 fw-bolder'>Update Event</h2>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor='profile' className='justify-content-center align-items-center d-flex mt-2 mb-3'>
                        <input onChange={(e) => setEventDetails({ ...eventDetails, image: e.target.files[0] })} className='mt-3 mb-4' id='profile' type="file" style={{ marginLeft: '100px', display: 'none' }} />
                        <img className='shadow' src={preview ? preview : `${base_URL}/Uploads/${editevent.image}`} alt="" style={{ height: '200px', width: '200px' }} />
                        </label>
                    <input type="text" value={eventDetails.title} onChange={(e) => setEventDetails({ ...eventDetails, title: e.target.value })} placeholder='Event Title' className='form-control mb-2 mt-1' />
                    <input type="text" value={eventDetails.location} onChange={(e) => setEventDetails({ ...eventDetails, location: e.target.value })} placeholder='Event Location' className='form-control mb-2 mt-1' />
                    <input type="text" value={eventDetails.locationUrl} onChange={(e) => setEventDetails({ ...eventDetails, locationUrl: e.target.value })} placeholder='Event Location Url' className='form-control mb-2 mt-1' />
                    <input type="text" value={eventDetails.date} onChange={(e) => setEventDetails({ ...eventDetails, date: e.target.value })} placeholder='Event Date' className='form-control mb-2 mt-1' />
                    <input type="text" value={eventDetails.time} onChange={(e) => setEventDetails({ ...eventDetails, time: e.target.value })} placeholder='Event Time' className='form-control mb-2 mt-1' />
                    <input type="text" value={eventDetails.amount} onChange={(e) => setEventDetails({ ...eventDetails, amount: e.target.value })} placeholder='Event Amount' className='form-control mb-2 mt-1' />
                </Modal.Body>
                <div className=' d-flex justify-content-center align-items-center mb-3 ms-2 me-2'>
                    <Button onClick={Update} variant="success" className='me-2 w-50'>Update</Button>
                    <Button variant="danger" className='w-50' onClick={handleClose1}>Cancel</Button>
                </div>
            </Modal>
            {/* <ToastContainer position='top-center' theme='dark' autoClose={1000} /> */}

        </>
    )
}

export default EditEvent