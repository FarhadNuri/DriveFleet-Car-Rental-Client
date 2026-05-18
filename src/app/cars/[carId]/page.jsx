import React from 'react'
import CarDetailsCard from '@/components/CarDetailsCard'
const fetchCarDetails = async (carId) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${carId}`)
  console.log(res)
  const data = await res.json()
  return data || null
}

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