import express from 'express';
import { bookRoom, bookedCustomerDetails, createRoom, getBookedRooms, getBookings, getCustomersBookedData, rooms } from '../Controllers/HallBookingController.js';


const router= express.Router();

router.get('/rooms', rooms)      //get all rooms
router.post('/create', createRoom)    //create rooms
router.get('/booking', getBookings)   //get all bookings
router.get('/bookedrooms', getBookedRooms) //list of booked rooms
router.get('/bookedcustomers', getCustomersBookedData)  //list of booked customers
router.get('/customerdetails', bookedCustomerDetails)   //customer details
router.post('/bookroom/:id', bookRoom)  //create a booking

export default router;