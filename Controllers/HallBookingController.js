const Rooms = [
  {
    roomId: "1",
    roomName: "Small Room",
    seatsAvailable: "2",
    amenities: "tv,ac,heater",
    pricePerHour: "1000",
    status: "Available",
  },
  {
    roomId: "2",
    roomName: "Normal Room",
    seatsAvailable: "4",
    amenities: "tv,ac,heater,phone",
    pricePerHour: "950",
    status: "Booked",
  },
  {
    roomId: "3",
    roomName: "Large Room",
    seatsAvailable: "1",
    amenities: "tv,ac,heater",
    pricePerHour: "800",
    status: "Booked",
  },
  {
    roomId: "4",
    roomName: "AC Room",
    seatsAvailable: "4",
    amenities: "tv,ac,heater,phone",
    pricePerHour: "700",
    status: "Available",
  },
  {
    roomId: "5",
    roomName: "Non-AC Room",
    seatsAvailable: "5",
    amenities: "tv,balcony,fan,heater",
    pricePerHour: "600",
    status: "Available",
  },
];

const Bookings = [
  {
    customerName: "Vimal",
    bookingDate: "20/06/2024",
    startTime: "12:00pm",
    endTime: "11:59am",
    bookingID: "1",
    roomId: "2",
    booked_On: "18/6/2024",
  },
  {
    customerName: "Susee",
    bookingDate: "20/06/2024",
    startTime: "12:00pm",
    endTime: "11:59am",
    bookingID: "2",
    roomId: "1",
    booked_On: "15/6/2024",
  },
  {
    customerName: "Sai",
    bookingDate: "10/06/2024",
    startTime: "12:00pm",
    endTime: "11:59am",
    bookingID: "3",
    roomId: "1",
    booked_On: "13/6/2024",
  },
];

//get all rooms
export const rooms = (req, res) => {
  res.status(200).json({ message: "Room info", data: Rooms });
};

//creating a room
export const createRoom = (req, res) => {
  const { roomName, seatsAvailable, amenities, pricePerHour, status } =
    req.body;

  const newRoom = {
    roomId: Rooms.length + 1,
    roomName: roomName,
    seatsAvailable: seatsAvailable,
    amenities: amenities,
    pricePerHour: pricePerHour,
    status: status,
  };
  Rooms.push(newRoom);

  res.status(200).json({ message: "Room created successfully", data: newRoom });
};

//get all bookings

export const getBookings = (req, res) => {
  res.status(200).json({ message: "Booking info", data: Bookings });
};

//get all booked rooms

export const getBookedRooms = (req, res) => {
  const bookedRooms = Rooms.filter((ele) => ele.status === "Booked");

  res.status(200).json({ message: "Booked Rooms", data: bookedRooms });
};

//List of customers with booked data

export const getCustomersBookedData = (req, res) => {
  const customerData = Bookings.map((ele) => {
    const room = Rooms.find((room) => room.roomId === ele.roomId);
    return {
      customerName: ele.customerName,
      roomName: room.roomName,
      bookingDate: ele.bookingDate,
      startTime: ele.startTime,
      endTime: ele.endTime,
    };
  });
  res.status(200).json({ message: "Booked Customer Data", data: customerData });
};

// List of times customers has booked the room with details

export const bookedCustomerDetails = (req, res) => {
  const { customerName } = req.body;
  const Booking = Bookings.filter((ele) => ele.customerName === customerName);
  console.log("book",Booking);
  if (Booking.length === 0) {
    return res.status(404).json({ message: "No customer bookings found" });
  }
  const customerBookings = Booking.map((booking) => {
    const room = Rooms.find((rooms) => rooms.roomId === booking.roomId);
    return {
      customerName: booking.customerName,
      roomName: room.roomName,
      date: booking.bookingDate,
      startTime: booking.startTime,
      endTime: booking.endTime,
      bookingID: booking.bookingID,
      bookingDate: booking.booked_On,
      bookingStatus: room.status,
    };
  });
  res
    .status(200)
    .json({ message: "Booked Customer details", data: customerBookings });
};

//Creating a booking

export const bookRoom = (req, res) => {
  const bookID = req.params.id;
  const {
    customerName,
    bookingDate,
    startTime,
    endTime,
    bookingID,
    roomId,
    booked_On,
  } = req.body;
  const roomID = Rooms.find((ele) => ele.roomId == bookID);
  if (!roomID) {
    res
      .status(404)
      .json({ message: "Searched room not available", list: Rooms });
  }
  const id = Bookings.filter((element) => element.roomId == bookID);
  if (id.length > 0) {
    const date = id.filter((e) => {
      return e.bookingDate == bookingDate;
    });
    if(date.length==0){
      const newBooking= {
        customerName: customerName,
        bookingDate: bookingDate,
        startTime: startTime,
        endTime: endTime,
        bookingID: Rooms.length+1,
        roomID: roomId,
        booked_On: booked_On
      }
      Bookings.push(newBooking)
      res.status(200).json({message:"Room booked successfully", bookedRoom:newBooking, list: Bookings})
    }
  }
};
