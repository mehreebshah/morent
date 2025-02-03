"use client";
import Piechart from "@/app/Components/Piechart";
import Locationdropdown from "./Location";
import Date from "./Date";
import Time from "./Time";
import car1 from '@/../public/car(1).png';
import Image from "next/image";
export default function Dashboard() {

  return (
    <div className="flex h-full bg-gray-100 ">
      {/* Sidebar */}
      <div className="w-1/5 bg-white text-gray-500 p-4">
        <h1 className="text-xl font-bold mb-6">Main Menu</h1>
        <ul className="space-y-4">
          <li className=" hover:bg-blue-500 hover:text-white rounded-md cursor-pointer">Dashboard</li>
          <li className="hover:bg-blue-500 hover:text-white rounded-md cursor-pointer">Car Rent</li>
          <li className="hover:bg-blue-500 hover:text-white rounded-md cursor-pointer">Insights</li>
          <li className="hover:bg-blue-500 hover:text-white rounded-md cursor-pointer">Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

        {/* Top Section */}
        <div className="grid grid-cols-3 gap-4">
          {/* Details Rental */}
          <div className="col-span-2 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Details Rental</h3>
           
            <div className="text-sm">
              <h1 className="text-lg font-serif">
                Pickup:
              <p><Locationdropdown/></p>
              <p><Date/></p>
              <p><Time/></p>
              </h1>
              <h1 className="text-lg font-serif">
                Drop of:
              <p><Locationdropdown/></p>
              <p><Date/></p>
              <p><Time/></p>
              </h1>
             
            </div>
          </div>

          {/* Top 5 Car Rentals */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Top 5 Car Rentals</h3>
            <Piechart/>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
          <ul className="space-y-2 flex">
          <Image src={car1} alt="car" width={150} height={150} className="bg-blue-100 hover:transition-shadow hover:rounded-md"/>
          <p className="font-semibold text-lg ml-4">Nisan GT-R</p>
          </ul>
          <span className="text-lg font-normal">Sport Car</span>
          <p className="mt-2 font-bold text-xl">Total Price: $80.00</p>
        </div>
      </div>
    </div>
  );
}
