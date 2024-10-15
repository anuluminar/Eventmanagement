import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import Dashboard from './Pages/Dashboard';
import UserBookings from './Pages/UserBookings';
import AdminHome from './Pages/AdminHome';
import AdminBooking from './Pages/AdminBooking';
import Authentication from './Components/Authentication';
import ViewEvents from './Pages/ViewEvents';
import AddEvent from './Components/AddEvent';
import Profile from './Pages/Profile';
import Bookings from './Pages/Bookings';
import { useContext } from 'react';
import { isAuthTokenContext } from './ContextShare/Context';
import PageNotFound from './Pages/PageNotFound';
import EditEvent from './Components/EditEvent';
// import { PayPalScriptProvider } from '@paypal/react-paypal-js';


function App() {

  const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext)

  // const PAYPAL_CLIENT_ID="AT2ZnAhry2TxLw4mPwKhu5oJUfeRvISv_gukHYNQtnmqaPBfzkRaXn6HDe2_NRwxSCJ3nWeqYb5oddet"

  return (
    // <PayPalScriptProvider  options={{"client-id":{PAYPAL_CLIENT_ID}}}>
    <div>
      
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={isAuthToken ? <Dashboard /> : <HomePage />} />
        <Route path='/add-event' element={<AddEvent />} />
        <Route path='/user-bookings' element={<UserBookings />} />
        <Route path='/admin-home' element={isAuthToken ? <AdminHome /> : <HomePage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/view-bookings' element={<AdminBooking />} />
        <Route path='/auth' element={<Authentication />} />
       <Route path='/book' element={<Bookings />} />
        <Route path='/view-events' element={<ViewEvents />} />
        <Route path='*' element={<PageNotFound/>} />
        
      </Routes>
     
    </div>
    // </PayPalScriptProvider>
  );
}

export default App;
