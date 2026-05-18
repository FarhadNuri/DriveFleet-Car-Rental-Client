export const fetchCars = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`)
  const data = await res.json()
  return data || []
}

export const fetchCarDetails = async (carId) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${carId}`)
  console.log(res)
  const data = await res.json()
  return data || null
}

export const fetchFeaturedCars = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured`)
  const data = await res.json()
  return data || []
}