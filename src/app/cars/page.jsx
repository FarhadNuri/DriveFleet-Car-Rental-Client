import Link from 'next/link'
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
          <li key={car._id}>
            {car.carName} | {car.carType} - ${car.dailyRentPrice}/
            <Link href={`/cars/${car._id}`}>View Car Details</Link>
          </li>
          
        ))}
      </ul>
      
    </div>
  )
}

export default AllCarsPage
