import { Container } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import { base_URL } from '../API/base_URL'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProfileAPI } from '../API/api';
import { Link } from 'react-router-dom';
import { editUserContext } from '../ContextShare/Context';


function Profile() {

    const { viewEditResponse, setViewEditResponse } = useContext(editUserContext)

    const [userProfile, setUserProfile] = useState({
        username: "",
        email: "",
        password: "",
        profile: ""
    })
    //existing image
    const [existingImage, setExistingImage] = useState("")

    const [preview, setPreview] = useState("")

    const [isUpdate, setIsUpdate] = useState(false)

    console.log(userProfile);

    const update = async () => {
        const { username, email, password, profile } = userProfile
        if (!username || !email || !password) {
            toast.warning('Please fill the form Completely')
        }
        else {
            const reqbody = new FormData()
            reqbody.append("username", username)
            reqbody.append("email", email)
            reqbody.append("password", password)
            preview ? reqbody.append("profile", profile) : reqbody.append("profile", existingImage)
            const token = sessionStorage.getItem("token")
            if(token){if (preview) {
                const reqheader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result = await editProfileAPI(reqbody, reqheader)
                if (result.status === 200) {
                    toast.success('Profile Updated Successfully')
                    sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                    setIsUpdate(true)
                    setViewEditResponse(result.data)
                }
                else {
                    console.log(result.response.data)
                }
            }}
            else {
                const reqheader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result = await editProfileAPI(reqbody, reqheader)
                // console.log(result);
                if (result.status === 200) {
                    toast.success('Profile Updated Successfully')
                    sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                    setIsUpdate(true)
                    setViewEditResponse(result.data)
                }
                else {
                    console.log(result.response.data)
                }
            }
        }

    }



    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("existingUser"))

        setUserProfile({ ...userProfile, username: user.username, email: user.email, password: user.password, profile: "" })

        setExistingImage(user.profile)
    }, [isUpdate])

    useEffect(() => {
        if (userProfile.profile) {
            setPreview(URL.createObjectURL(userProfile.profile))
        }
        else {
            setPreview("")
        }
    }, [userProfile.profile])

    return (
        <>
            <Container className='mt-5 '>
                <Link to={'/dashboard'} className='mt-4' style={{ textDecoration: 'none' }}><h4 className='text-success'><i class="fa-solid fa-arrow-left me-2"></i>Back to Dashboard</h4></Link>
                <Row className='shadow d-flex justify-content-center align-items-center' style={{ height: '80vh' }}>
                    <Col md={6} d-flex justify-content-center align-items-center>
                        <label htmlFor='profile'>
                            <input onChange={(e) => setUserProfile({ ...userProfile, profile: e.target.files[0] })} id='profile' type="file" style={{ marginLeft: '100px', display: 'none' }} />
                            {existingImage == "" ? <img src={preview ? preview : "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"} alt="no image" style={{ height: '200px', width: '200px' }} />
                                :
                                <img src={preview ? preview : `${base_URL}/Uploads/${existingImage}`} alt="no image" style={{ height: '300px', width: '300px' }} />
                            }
                        </label>
                    </Col>
                    <Col md={6}>
                        <input value={userProfile.username} onChange={(e) => setUserProfile({ ...userProfile, username: e.target.value })} type="text" placeholder='UserName' className='form-control mt-3' />
                        <input value={userProfile.email} onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })} type="text" placeholder='Email Address' className='form-control mt-3' />
                        <input value={userProfile.password} onChange={(e) => setUserProfile({ ...userProfile, password: e.target.value })} type="password" placeholder='Password' className='form-control mt-3' />
                        <button onClick={update} className='update btn w-50 mt-5 mb-5' style={{ marginLeft: '120px' }}>Update</button>
                    </Col>
                </Row>
            </Container>
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />

        </>
    )
}

export default Profile