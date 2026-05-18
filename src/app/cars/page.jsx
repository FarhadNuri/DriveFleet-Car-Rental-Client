import React from 'react'

const fetchCars = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`)
  const data = await res.json()
  return data || []
}

async function AllCarsPage() {
  const cars = await fetchCars()
   console.log(cars)
  return (
    <div>
      <h1>All Cars</h1>
      <ul>
        {cars.map((car) => (
          <li key={car.carId}>
            {car.carName} | {car.carType} - ${car.dailyRentPrice}/day
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AllCarsPage
