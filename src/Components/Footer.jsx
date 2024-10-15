import React, { useEffect, useState } from 'react'
import './Component.css'
import { Col, Row } from 'react-bootstrap'
import Video from '../media/qr.jpeg'
import { Link } from 'react-router-dom'
import Video1 from '../media/profile_boy.jpeg'
import Video2 from '../media/qr.jpeg'
import Video3 from '../media/profile_boy.jpeg'

function Footer() {

    const [token, setToken] = useState(false)

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(true)
        }
    }, [])

    return (
        <div className='footer'>
            <div className='container'>
                <Row>
                    <Col md={4} className='mb-5 mt-5'>
                        <h2 className='mt-4 text-white' style={{ fontFamily: 'Cinzel, serif' }}>Musical Meerkat <span className='fs-1 text-danger'>.</span></h2> <br />
                        <p className='text-secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint omnis ullam cumque sapiente inventore adipisci aut voluptatem, sequi optio in obcaecati. Est atque perspiciatis nulla quaerat, corporis ullam quibusdam minus.</p>
                        <p className='text-secondary'>Lorem ipsum dolor, sit amet consectetur.</p>
                        <div className='d-flex text-danger'>
                            <h4 className='ms-1'><i class="fa-brands fa-facebook-f"></i></h4>
                            <h4 className='ms-5'><i class="fa-brands fa-twitter"></i></h4>
                            <h4 className='ms-5'><i class="fa-brands fa-youtube"></i></h4>
                            <h4 className='ms-5'><i class="fa-brands fa-instagram"></i></h4>
                            <h4 className='ms-5'><i class="fa-brands fa-whatsapp"></i></h4>
                        </div>
                    </Col>
                    <Col md={4} className='mb-5 mt-5'>
                        <h4 className='mt-4 text-white ' style={{ fontFamily: 'Cinzel, serif' }}>GALLERY</h4> <br />
                        <Row className='mb-2'>
                            <Col md={4}  >
                                <a href={Video}><img style={{ height: '100px', width: '140px' }} src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="no image" /></a>
                            </Col>

                            <Col md={4} >
                                <a href={Video1}><img style={{ height: '100px', width: '140px' }} src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /></a>
                            </Col>

                            <Col md={4} >
                                <a href={Video2}><img style={{ height: '100px', width: '140px' }} src="https://images.pexels.com/photos/3052448/pexels-photo-3052448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /></a>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <a href={Video3}><img style={{ height: '100px', width: '140px' }} src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="no image" /></a>
                            </Col>
                            <Col md={4}>
                                <a href={Video}><img style={{ height: '100px', width: '140px' }} src="https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /></a>
                            </Col>
                            <Col md={4}>
                                <a href={Video2}><img style={{ height: '100px', width: '140px' }} src="https://images.pexels.com/photos/625644/pexels-photo-625644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /></a>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4} className='mb-5 mt-5'>
                        <h4 className='mt-4 text-white text-center' style={{ fontFamily: 'Cinzel, serif' }}>UseFul Links</h4> <br />
                        <div className='text-center mt-4'>
                            <Link to={'/'} style={{ textDecoration: 'none' }}><h6 style={{ color: 'gray' }}>Home</h6></Link>
                            <Link to={'/auth'} style={{ textDecoration: 'none' }}><h6 style={{ color: 'gray' }}>Login</h6></Link>
                            {token && <Link to={'/dashboard'} style={{ textDecoration: 'none' }}><h6 style={{ color: 'gray' }}>Dashboard</h6></Link>}
                            {token && <Link to={'/view-events'} style={{ textDecoration: 'none' }}><h6 style={{ color: 'gray' }}>Events</h6></Link>}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Footer