import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaSearch, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../states/Contet";
const songs = [
  {
    id: Math.random() * Date.now(),
    title: "Born To Shine",
    artist: "Diljit Dosanjh",
    mp3: new Audio("/assets/mp3/Born To Shine - Diljit Dosanjh.mp3"),
    img: "/assets/Diljit1.jpeg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Navi Navi Yaari",
    artist: "Diljit Dosanjh",
    mp3: new Audio("/assets/mp3/Navi Navi Yaari - Diljit Dosanjh.mp3"),
    img: "/assets/Diljit1.jpeg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Umbrella",
    artist: "Diljit Dosanjh",
    mp3: new Audio("/assets/mp3/Umbrella - Diljit Dosanjh.mp3"),
    img: "/assets/Diljit2.jpeg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Umbrella",
    artist: "Diljit Dosanjh",
    mp3: new Audio("/assets/mp3/Umbrella - Diljit Dosanjh.mp3"),
    img: "/assets/Diljit3.jpeg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Bachke Bachke",
    artist: "Karan",
    mp3: new Audio("/assets/mp3/Bachke Bachke - DjPunjab.Com.Se.mp3"),
    img: "/assets/karan.jpeg",
  },
  
];

const Navbar = () => {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const { setFilteredSongs } = useGlobalContext();
  const [showDropDown, setShowDropDown] = useState(false);
  const filterSongs = (e) => {
    setQuery(e.target.value);
    const fil = songs.filter((song) => {
      if (
        song.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        song.artist.toLowerCase().includes(e.target.value.toLowerCase())
      )
        return song;
    });
    if (e.target.value === "") setFilteredSongs([]);
    else setFilteredSongs(fil);
  };

  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);

  return (
    <header className="flex sticky top-0 z-50 justify-between ml-2 rounded-[6px] mt-2 px-8 secondary_bg items-center ">
      <div className="flex gap-2 items-center w-full max-w-screen-xl mx-auto">
        <img
          src="/assets/Spotify_Logo_CMYK_Green.png"
          alt="Spotify Logo"
          className="w-auto h-8 m-4"
        />
        {location.pathname === "/search" && (
          <div className="relative w-full flex-1">
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search"
              autoComplete="off"
              value={query}
              onChange={filterSongs}
              className="block w-full rounded-full pl-12 border-0 text-gray-300 shadow-sm ring ring-transparent placeholder:text-gray-400 focus:ring-[3px] focus:ring-inset focus:ring-white outline-none p-3 hover:ring-white/20 bg-[#1a1919]"
            />
          </div>
        )}
      </div>

      <div className="relative">
        <button onClick={() => setShowDropDown(!showDropDown)}>
          <FaUser />
        </button>
        {showDropDown && (
          <div className="absolute dropdown bg-[#282828] top-8 text-sm right-0 w-[12rem]">
            <ul className="p-1">
              <li>
                <Link
                  to="/account"
                  className="flex p-2 justify-between hover:bg-white/10"
                >
                  <span>Account</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/account"
                  className="flex p-2 justify-between hover:bg-white/10"
                >
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/account"
                  className="flex p-2 justify-between hover:bg-white/10"
                >
                  <span>Upgrade to Premium</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/account"
                  className="flex p-2 justify-between hover:bg-white/10"
                >
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;