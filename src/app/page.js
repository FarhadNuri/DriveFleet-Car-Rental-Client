import Image from "next/image";
import { fetchFeaturedCars } from "@/lib/cars/data";
import FeaturedCars from "@/components/FeaturedCars";
export default async function Home() {
    const featuredCars = await fetchFeaturedCars()
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-6xl font-bold text-center sm:text-left">Driver Fleet Car Rental</h1>
        <FeaturedCars cars={featuredCars} />
      </main>
    </div>
  );
}
