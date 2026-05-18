import React from 'react'

function CarDetailsCard({ car }) {
    const {carName, carType, dailyRentPrice, seatCapacity, pickupLocation, availabilityStatus} = car
  return (
    <div>
      <h2>Car Model: {carName}</h2>
      <p>Car Type: {carType}</p>
      <p>Daily Rent Price: ${dailyRentPrice}/day</p>
      <p>Seats: {seatCapacity}</p>
      <p>Pickup Location: {pickupLocation}</p>
      <p>Availability: {availabilityStatus ? 'Available' : 'Not Available'}</p>
    </div>
  )
}

export default CarDetailsCard
