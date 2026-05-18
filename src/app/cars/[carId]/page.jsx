import React from 'react'
import CarDetailsCard from '@/components/CarDetailsCard'
import { fetchCarDetails } from '@/lib/cars/data'

async function CarDetails({ params }) {
    const { carId } = await params 
  const car = await fetchCarDetails(carId)
  return (
    <div>
      <h1>Car Details</h1>
      <CarDetailsCard car={car} />
    </div>
  )
}

export default CarDetails