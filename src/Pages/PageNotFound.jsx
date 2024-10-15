import React from 'react'
import Footer from '../Components/Footer'

function PageNotFound() {
  return (
    <> 
        <div className='d-flex justify-content-center align-items-center flex-column' style={{height:'80vh'}}>
            <img src="https://assets-v2.lottiefiles.com/a/1e38ee28-1182-11ee-9fd9-434adb6f6cdd/6GZy7INRON.gif" style={{height:'300px',width:'400px'}} alt="" />
            <h3 className='text-danger fw-bold'>PAGE NOT FOUND!!</h3>
        </div>
        <Footer/>
    </>
  )
}

export default PageNotFound