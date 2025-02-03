
"use client";
import { useState } from "react";
import car2 from "../../../public/inside-car-4.jpeg";
import car3 from "../../../public/inside-car-5.jpg";
import car4 from "../../../public/in car.png";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import Review from "./Review";
import Popular from "./Popular";
import Link from "next/link";
interface Product {
  name: string;
  type: string;
  fuelCapacity: number;
  transmission: string;
  seatingCapacity: number;
  pricePerDay: number;
  slug: { current: string };
  image: { asset: { url: string } };
}

const ProductDetail = ({ product }: { product: Product }) => {

  const [rating, setRating] = useState<number>(0); // User's rating
  const [hoveredRating, setHoveredRating] = useState<number | null>(null); // Hover effect for stars
  const [likedCars, setLikedCars] = useState<string[]>([]); // State to track liked cars

  const handleLike = (slug: string) => {
    setLikedCars((prevLikedCars) =>
      prevLikedCars.includes(slug)
        ? prevLikedCars.filter((car) => car !== slug)
        : [...prevLikedCars, slug]
    );
  };

  const generateDescription = () => {
    let description = `${product.name} is a ${product.type} vehicle with a fuel capacity of ${product.fuelCapacity} liters. `;

    if (product.transmission.toLowerCase() === "automatic") {
      description +=
        "It features a smooth automatic transmission for easy driving. ";
    } else {
      description +=
        "It comes with a manual transmission for an engaging driving experience. ";
    }

    description += `With seating capacity for ${product.seatingCapacity} people, it is ideal for group travel. `;
    description += `This vehicle is available for rent at a rate of `;

    return description;
  };

  const handleRatingClick = (rate: number) => {
    setRating(rate);
  };

  return (
    <section className="text-gray-600  body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto bg-slate-50">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full">
            {product.image ? (
              <Image
                alt="ecommerce"
                className="w-full object-cover object-center rounded-md hover:shadow-md hover:cursor-pointer transition-transform duration-300 transform hover:scale-105"
                height={500}
                width={500}
                src={product.image.asset.url}
              />
            ) : (
              <div>Image not available</div>
            )}
            <div className="flex gap-2">
              <Image
                src={car4}
                alt="inside car"
                height={150}
                width={150}
                className="rounded-md mt-6 hover:shadow-md hover:cursor-pointer transition-transform duration-300 transform hover:scale-105"
              />
              <Image
                src={car2}
                alt="inside car"
                height={150}
                width={150}
                className="rounded-md mt-6 hover:shadow-md hover:cursor-pointer transition-transform duration-300 transform hover:scale-105"
              />
              <Image
                src={car3}
                alt="inside car"
                height={150}
                width={150}
                className="rounded-md mt-6 hover:shadow-md hover:cursor-pointer transition-transform duration-300 transform hover:scale-105"
              />
            </div>
          </div>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0  rounded-md">
           <div className="flex items-center justify-between">

           
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.name}
            </h1>
            {/* Heart Icon */}
            
                            <div
                              className="cursor-pointer text-xl "
                              onClick={() => handleLike(product.slug.current)} // Use handleLike function
                            >
                        <div className="flex flex-col mb-4">
                              {likedCars.includes(product.slug.current) ? (
                                <AiFillHeart className="text-red-600 transition-transform duration-300 transform hover:scale-125" />
                              ) : (
                                <CiHeart className="text-gray-400 hover:text-red-600 transition-colors duration-300" />
                              )}
                            </div>
                          </div>
                          </div>
            <div className="flex mt-4 items-center">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(null)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={
                      hoveredRating && star <= hoveredRating
                        ? "gold"
                        : rating >= star
                          ? "gold"
                          : "none"
                    }
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="w-6 h-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                  </svg>
                ))}
              </div>
              <span className="ml-3 text-gray-600">
                {rating > 0 ? `You rated ${rating}/5` : `Rate this ${product.name}`}
              </span>
            </div>
            <p className="leading-relaxed text-sm sm:text-base mt-6">
              {generateDescription()}
            </p>
            <br />
            <p className="leading-relaxed text-sm sm:text-base  font-semibold  text-gray-400">
              Fuel Capacity: 
              <span className="text-gray-500 font-semibold ml-14">
              {product.fuelCapacity} liters
              </span>
            </p>
            <p className="leading-relaxed text-sm sm:text-base  font-semibold  text-gray-400">
              Seating Capacity: 
              <span  className="text-gray-500 font-semibold ml-14">
              {product.seatingCapacity}
              </span>
            </p>
            <p className="leading-relaxed text-sm sm:text-base  font-semibold  text-gray-400">
              Transmission:
              <span className="text-gray-500 font-semibold ml-14">
               {product.transmission}
              </span>
            </p>
            <p className="leading-relaxed text-sm font-semibold sm:text-base text-gray-400">
              typeCar: 
              <span className="text-gray-500 font-semibold ml-14">
              {product.type}
              </span>
            </p>
            <div className="flex mt-6 items-center pb-5 mb-5 text-3xl text-gray-900 font-semibold"> 
              {product.pricePerDay}
              <span className="text-gray-500 text-base">/day</span>
            </div>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <Link href={`/Payment`}>
              <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Rent Now
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Review />
      <div className="container px-5 py-24 mx-auto">
        <Popular/>
      </div>
    </section>
  );
};

export default ProductDetail;
