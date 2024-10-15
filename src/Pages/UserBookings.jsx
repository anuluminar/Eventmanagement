import React, { useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Footer from '../Components/Footer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { bookContext } from '../ContextShare/Context';
import { getuserBookings } from '../API/api';
import img from '../media/qr.jpeg'


function UserBookings() {


  const { book, setBook } = useContext(bookContext)

  const [allbook, setallbook] = useState([])

  const [loader, setLoader] = useState(false)

  const downloadPDF = () => {
    const capture = document.querySelector('.actual-reciept')
    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL('img/jpeg')
      const doc = new jsPDF('p', 'px', 'a4', 200, 350, { fontSize: 40 })
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, 'JPEG', 0, 0, componentWidth, componentHeight);
      setLoader(false)
      doc.save('ticket.pdf')
    })
  }

  const getuserBook = async () => {
    const token = sessionStorage.getItem("token")
    const header = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    if (token) {
      const result = await getuserBookings(header)
      console.log(result);
      setallbook(result.data)
    }
  }
  console.log(allbook);

  useEffect(() => {
    getuserBook()

  }, [book])

  return (
    <>
      <Container>
         <h2 className='text-center mt-4'>Bookings</h2>
          <div className='row mt-3' >
          { allbook?.length>0?
          allbook?.map((book)=>(
            <div className='col-md-4'>
            <Container>
              <div id="example-fade-text" className='actual-reciept shadow '>
                <div className='mt-4 d-flex justify-content-center align-items-center flex-column container '>
                  <h5 className='mt-3 text-danger'>{book.title}</h5>
                  <img src={img} className='mb-2' style={{height:'200px',width:'200px'}} alt="" />
                  <a href={book.locationUrl} style={{textDecoration:'none',color:'green'}}><h5 >{book.location}</h5></a>
                  <h5>{book.date} | {book.time}</h5>
                  <h5>no : of persons : <span className='text-primary'>{book.quantity}</span></h5>
                  <h6 className='text-center text-danger'><i class="fa-solid fa-circle-exclamation me-2 "></i>Non Cancellable</h6>
                </div>
                <div className='d-flex justify-content-center align-items-center mb-5 mt-2'>
                  <Button onClick={downloadPDF} className='btn btn-dark w-50 mb-3' disabled={!(loader===false)}><i class="fa-solid fa-cloud-arrow-down"></i></Button>
                </div>
                </div>
                
            </Container>
          </div> 
          ))
          : <div className='d-flex justify-content-center align-items-center' style={{height:'60vh'}}><h4 className='text-danger text-center  fw-bold ' >NO BOOKINGS YET TO DISPLAY ‼️</h4></div>
         }
        </div>
    
      </Container>
      <Footer />
    </>
  )
}

export default UserBookings