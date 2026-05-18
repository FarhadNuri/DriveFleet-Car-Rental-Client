import Link from 'next/link'
import React from 'react'
import { fetchCars } from '@/lib/cars/data'

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
