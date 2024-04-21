import React from 'react';
import Layout from "../../Layout/Layout";
import Card from "../Card/Card";
import SongBar from "../MasterBar/SongBar";
import { useEffect } from "react";
import { useGlobalContext } from "../../states/Contet";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar";

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

const Home = () => {
  const { getUser } = useGlobalContext();
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Layout>
      <Navbar />
      <div className="tertiary_bg ml-2 px-4 py-4 home ">
        <div className="flex justify-between mb-4 pt-4 items-center">
          <span className="text-xl font-bold hover:underline cursor-pointer">
            Focus
          </span>
          <span>Show All</span>
        </div>
        <div className="grid  gap-6 grid-cols-5">
          {songs.map((song, i) => {
            return <Card key={song.id} idx={i} song={song} />;
          })}
        </div>
        <div className="flex justify-between my-4 items-center">
          <span className="text-xl font-bold hover:underline cursor-pointer">
            Spotify List
          </span>
          <span>Show All</span>
        </div>
        <div className="grid  gap-6 grid-cols-5">
          {songs.map((song, i) => {
            return <Card key={song.id} idx={i} song={song} />;
          })}
        </div>
      </div>
      <Footer/>
      <SongBar />
    </Layout>
  );
};

export default Home;