import React, { useState } from "react";
import { BiLibrary } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { Link } from "react-router-dom";

const Sidebar = () => {
  
  const mockedPlaylists = [
    {
      _id: 1,
      title: "Playlist 1",
      songs: ["Song 1", "Song 2", "Song 3"]
    },
    {
      _id: 2,
      title: "Playlist 2",
      songs: ["Song 4", "Song 5", "Song 6"]
    }
  ];

  const [playlists, setPlaylists] = useState(mockedPlaylists);

  return (
    <div className="w-1/4 fixed left-0 mt-2 top-0 sidebar ">
      <div className="nav secondary_bg rounded-lg p-6">
       
        <Link to={"/search"} className="flex items-center gap-6">
          <FiSearch className="font-bold text-2xl" />
          <span className="text-lg">Search</span>
        </Link>
      </div>
      <div className="mt-2 secondary_bg rounded-lg px-2 py-2">
        <div className="flex px-4 justify-between mb-4 items-center gap-4">
          <div className="flex gap-2 items-center">
            <BiLibrary className="font-bold text-xl" />
            <span>Your library</span>
          </div>
          <button className="hover:bg-black/25 rounded-[50%] p-2">
            <FaPlus className="font-bold text-xl" />
          </button>
        </div>
        <div className="btns flex gap-4 mb-4">
          <Link
            to={"/"}
            className="rounded-full mt-4 px-3   py-1 bg-white/10 text-white text-sm"
          >
            Playlists
          </Link>
          <Link
            to={"/"}
            className="rounded-full mt-4 px-3   py-1 bg-white/10 text-white text-sm"
          >
            Artists
          </Link>
        </div>
        <div className="my-6 px-2">
          {playlists.map((p) => {
            return (
              <div key={p._id} className="flex gap-4 my-2">
                <div>
                  <img
                    src="/assets/Diljit3.jpeg"
                    width={50}
                    height={50}
                    alt=""
                  />
                </div>
                <div>
                  <h3 className="text-base font-medium mb-2">{p.title}</h3>
                  <p className="text-sm text-white/80">
                    Playlist
                    <span> . {p.songs.length} Songs</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <button className="mx-4 mt-12 text-sm border-white border rounded-full flex gap-2 px-3 py-1 items-center  text-white ">
        <TbWorld />
        <span className="text-white font-bold">English</span>
      </button>
    </div>
  );
};

export default Sidebar;
