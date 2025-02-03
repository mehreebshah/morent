"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { CiHeart } from "react-icons/ci";
import { AiFillHeart } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/app/context/wishlistContext"; // Import the Wishlist context

const Recomended = () => {
  interface Product {
    name: string;
    type: string;
    fuelCapacity: number;
    transmission: string;
    seatingCapacity: number;
    pricePerDay: number;
    slug: { current: string };
    image: {
      asset: {
        url: string;
      };
    };
  }

  const { likedCars, toggleLike } = useWishlist(); // Use the Wishlist context
  const [notification, setNotification] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const handleLike = (slug: string, carName: string) => {
    toggleLike(slug); // Toggle the liked state using the context

    // Show notification when a car is liked
    if (!likedCars.includes(slug)) {
      setNotification(`${carName} added to Wishlist!`);
      setTimeout(() => setNotification(null), 2000); // Clear notification after 2 seconds
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == 'car' && "recommended" in tags]{
        name,
        type,
        fuelCapacity,
        transmission,
        seatingCapacity,
        pricePerDay,
        slug,
        image {
          asset -> {
            url
          }
        }
      }`;
      const result = await client.fetch(query);
      setProducts(result);
    };
    fetchProducts();
  }, []);

  return (
    <div className="text-base text-gray-400 mx-4 sm:mx-6 lg:mx-12 my-12 relative">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-600 mb-8 text-center sm:text-left">
        Recommended Cars
      </h2>

      {/* Notification Banner */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 transform -translate-x-1/2 bg-gradient-to-r from-blue-300 to-blue-500 text-white px-4 py-2 rounded shadow-lg text-center">
          {notification}
        </div>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col p-4 sm:p-6 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-2 duration-300 ease-in-out relative"
          >
            {/* Product Name and Type */}
              <div className="text-xl font-semibold text-gray-900 flex items-center justify-between">
                {product.name}
                {/* Heart Icon */}
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => handleLike(product.slug.current, product.name)} // Use handleLike function
                >
            <div className="flex flex-col mb-4">
                  {likedCars.includes(product.slug.current) ? (
                    <AiFillHeart className="text-red-600 transition-transform duration-300 transform hover:scale-125" />
                  ) : (
                    <CiHeart className="text-gray-400 hover:text-red-600 transition-colors duration-300" />
                  )}
                </div>
              </div>
              <div className="mt-1 text-sm text-gray-400">{product.type}</div>
            </div>

            {/* Product Image */}
            {product.image && (
              <Image
                src={urlFor(product.image).url()}
                alt={product.name}
                width={300}
                height={200}
                className="object-contain self-center max-w-full h-48 mb-4 rounded-md transform hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            )}

            {/* Product Features */}
            <div className="flex flex-col gap-2 text-sm font-medium text-gray-400 mb-4">
              <div>Fuel: {product.fuelCapacity}</div>
              <div>Seating: {product.seatingCapacity}</div>
              <div>Transmission: {product.transmission}</div>
            </div>

            {/* Product Footer */}
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold text-gray-900">
                {product.pricePerDay}
              </div>
              <Link href={`/car/${product.slug.current}`}>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-transform duration-300">
                  Rent Now
                </button>
              </Link>
            </div>
          </div>
        ))}

        {/* Show More Button */}
        <div className="flex items-center justify-center col-span-full mt-8">
          <Link href="/Category">
            <button className="bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-3 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-transform duration-300">
              Show More Cars
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Recomended;