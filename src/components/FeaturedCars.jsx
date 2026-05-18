import React from "react";

async function FeaturedCars({ cars }) {
    
  return (
    <div>
      <h1>Featured Cars</h1>
        <ul>
            {cars.map((car) => (
                <li key={car._id}>
                    {car.carName} | {car.carType} - ${car.dailyRentPrice}/day
                </li>
            ))}
        </ul>
    </div>
  );
}

export default FeaturedCars;
