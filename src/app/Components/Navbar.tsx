// "use client";
// import Image from "next/image";
// import logo from "../../../public/Logo.png";
// import { GoSearch } from "react-icons/go";
// import { HiOutlineDotsHorizontal } from "react-icons/hi";
// import { IoMdSettings } from "react-icons/io";
// import { IoIosHeartEmpty } from "react-icons/io";
// import { CiBellOn } from "react-icons/ci";
// import Link from "next/link";
// import { useWishlist } from "../context/wishlistContext";

// import {
//   ClerkProvider,
//   SignInButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";
// const Navbar = () => {
//   const { likedCars } = useWishlist();
//   return (
//     <nav className="flex flex-wrap justify-between items-center border-b shadow-xl border-stone-200 h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
//       {/* Logo */}
//       <div className="flex items-center">
//         <Link href="/">
//           <Image src={logo} alt="Logo" width={100} height={100} />
//         </Link>
//       </div>

//       {/* Search Bar */}
//       <div className="sm:flex w-full md:w-auto mt-4 md:mt-0">
//         <form
//           className="flex items-center justify-between border border-gray-200 p-2 rounded-lg w-full md:w-[300px] lg:w-[400px] xl:w-[500px]"
//           // onSubmit={handleSearch}
//         >
//           <GoSearch className="text-xl text-gray-600 cursor-pointer" />
//           <input
//             type="text"
//             name="name"
//             placeholder="Search something here"
//             className="bg-transparent outline-none flex-grow px-2 text-sm sm:text-base"
//           />
//           <HiOutlineDotsHorizontal className="text-xl text-gray-600 cursor-pointer mx-2" />
//         </form>
//       </div>

//       {/* Icons and Profile Section */}
//       <div className="hidden sm:flex items-center space-x-5">
//         {/* Cart Icon */}
//         <Link href="/wishlist" className="relative group hover:text-blue-400">
//           <IoIosHeartEmpty className="w-7 h-7" />
//           <span className="absolute -top-1 -right-1 bg-zinc-800 text-zinc-200 w-5 h-5 rounded-full text-xs flex items-center justify-center group-hover:bg-blue-400 group-hover:text-black font-semibold">
//             {likedCars.length} {/* Display the number of liked cars */}
//           </span>
//         </Link>

//         {/* Settings Icon */}
//         <Link href="/settings" className="relative group hover:text-blue-400">
//           <CiBellOn className="w-7 h-7" />
//         </Link>
//         <Link href="/Dashboard" className="relative group hover:text-blue-400">
//           <IoMdSettings className="w-7 h-7" />
//         </Link>
//         {/* Profile Section */}
//         <div className="relative">
//           <ClerkProvider>
//             <SignedOut>
//               <SignInButton />
//             </SignedOut>
//             <SignedIn>
//               <UserButton />
//             </SignedIn>
//           </ClerkProvider>
//         </div>
//       </div>
      
//     </nav>
//   );
// };

// export default Navbar;
"use client";

import Image from "next/image";
import logo from "../../../public/Logo.png";

import { IoMdSettings } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import Link from "next/link";
import { useWishlist } from "../context/wishlistContext";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";


const Navbar = () => {

  const { likedCars } = useWishlist();
  

  return (
    <nav className="flex flex-wrap justify-between items-center border-b shadow-xl border-stone-200 h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/">
          <Image src={logo} alt="Logo" width={100} height={100} />
        </Link>
      </div>

     

      {/* Icons and Profile Section */}
      <div className="flex items-center space-x-5">
        {/* Wishlist Icon */}
        <Link href="/wishlist" className="relative group hover:text-blue-400">
          <IoIosHeartEmpty className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 bg-zinc-800 text-zinc-200 w-5 h-5 rounded-full text-xs flex items-center justify-center group-hover:bg-blue-400 group-hover:text-black font-semibold">
            {likedCars.length}
          </span>
        </Link>

        {/* Notification and Settings Icons */}
       
        <Link href="/Dashboard" className="relative group hover:text-blue-400">
          <IoMdSettings className="w-7 h-7" />
        </Link>

        {/* Profile Section */}
        <div className="relative">
          <ClerkProvider>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </ClerkProvider>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
