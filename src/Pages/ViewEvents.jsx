import './Pages.css'
import { Col, Row } from 'react-bootstrap'
import Footer from '../Components/Footer'
import { useContext, useEffect, useState } from 'react'
import { bookContext, viewEventUserResponseContext } from '../ContextShare/Context'
import { bookevent, getUserEventAPI } from '../API/api'
import { Container } from '@mui/material'
import { base_URL } from '../API/base_URL';
import { Link } from 'react-router-dom'

function ViewEvents() {


  const { viewEventResponse, setViewEventResponse } = useContext(viewEventUserResponseContext)

  const [isToken, setIsToken] = useState(false)

  const [searchkey, setSearchkey] = useState("")

  const [homeEvents, setHomeEvents] = useState([])


  const getallEvent = async () => {
    const token = sessionStorage.getItem("token")
    const header = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await getUserEventAPI(searchkey, header)
    if (token) {
      if (result.status === 200) {
        setHomeEvents(result.data)
      }
    }
  }



  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsToken(true)
    }
  }, [])



  useEffect(() => {
    getallEvent()
  }, [viewEventResponse, searchkey])
  return (
    <>
      <div className='event-bg'>
        <h2 className='text-center fw-bold mt-3 mb-4'><br /><br /> Come Join the Bash</h2>
        <div className=' d-flex justify-content-center align-items-center ' >
          <input type="text" value={searchkey} className='form-control w-50 rounded' onChange={e => setSearchkey(e.target.value)} placeholder='Search Events' />
          <i class="fa-solid fa-magnifying-glass fa-rotate-90°" style={{ marginLeft: '-40px', color: 'grey' }}></i>
        </div>

        <Container>
          <Row className='d-flex justify-content-center align-items-center'>
            {homeEvents?.length > 0 ?
              homeEvents?.map((event) => (
                <Col md={4} className='mb-3 mt-5'>
                  <div className="event">
                    <img src={event ? `${base_URL}/Uploads/${event.image}` : null} style={{ height: '350px', width: '360px' }} alt="Avatar" class="image" />
                    <div className="overlay">
                      <div className="text" >
                        <h5 className='fw-bold'>{event.title}</h5>
                        <a href={event.locationUrl} style={{ textDecoration: 'none', color: 'white' }}><p><i class="fa-solid fa-location-dot me-2"></i>{event.location}</p></a>
                        <p><i class="fa-regular fa-calendar-days me-2"></i>{event.date},{event.time}</p>
                        <div className='d-flex justify-content-center align-items-center'>
                           <div className='d-flex justify-content-center align-items-center'>
                              <button className='btn btn-danger'>Amount ₹ {event.amount}</button>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))
              : <div>
                {isToken ?

                  <div className='d-flex justify-content-center align-items-center'>
                    <p className='text-center text-center fs-1 mt-5 mb-5'>Sorry...No such Event is Available....</p></div>
                  : <div className='d-flex justify-content-center align-items-center mt-5 mb-5 flex-column '>
                    <i class="fa-solid fa-lock fa-shake fa-10x mb-4" ></i>
                    <h3 className='mt-3'>Please <Link className='text-decoration-none text-success' to={"/auth"}>Login <i class="fa-solid fa-unlock"></i></Link> To View Events....</h3>
                  </div>
                }
              </div>

            }
          </Row>
          <div className='d-flex justify-content-center align-items-center '>
            <Link className='w-50 d-flex justify-content-center align-items-center' to={'/book'} style={{ textDecoration: 'none' }}><button className='btn btn-dark mb-5 mt-5 w-50'><h5>BOOK OUR EVENT</h5></button></Link>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  )
}

export default ViewEvents