import React, { createContext, useState } from 'react';
import axios from 'axios';

export const BookingContext = createContext();

const BookingContextProvider = (props) => {
  const [customerId, setCustomerId] = useState();
  const [workerId, setWorkerId] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const clearBooking = () => {
    setCustomerId();
    setWorkerId();
    setStartTime();
    setEndTime();
  };

  const submitBooking = async () => {
    // Removes 'Z' character from end of string to allow it to be passed
    const modifiedStartTime = startTime
      .toISOString()
      .substring(0, startTime.toISOString().length - 1);
    const modifiedEndTime = endTime
      .toISOString()
      .substring(0, endTime.toISOString().length - 1);

    // TODO: Handle errors
    await axios.post('http://localhost:8081/bookings', {
      workerUsername: workerId,
      customerUsername: customerId,
      startDateTime: modifiedStartTime,
      endDateTime: modifiedEndTime,
    });
  };

  const bookingContext = {
    customerId,
    setCustomerId,
    workerId,
    setWorkerId,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    clearBooking,
    submitBooking,
  };

  return (
    <BookingContext.Provider value={{ ...bookingContext }}>
      {props.children}
    </BookingContext.Provider>
  );
};

export default BookingContextProvider;
