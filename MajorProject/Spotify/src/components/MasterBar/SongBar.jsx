import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiShuffle, BiRepeat } from "react-icons/bi";
import { FaPause, FaPlay } from "react-icons/fa";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import {
    pauseMaster,
    playMaster,
    playSong,
} from "../../states/Actors/SongActor";
import { useGlobalContext } from "../../states/Contet";
import "./SongBar.css";
import songs from "../Home/Home";

const SongBar = () => {
    const { masterSong, isPlaying } = useSelector((state) => state.mainSong);
    const {
        progress,
        setProgress,
        resetEverything,
        songIdx,
        setSongIdx,
        currTime,
        setCurrTime,
        duration,
        setDuration,
    } = useGlobalContext();
    const dispatch = useDispatch();

    const handleMaster = () => {
        if (isPlaying) {
            dispatch(pauseMaster());
        } else {
            dispatch(playMaster());
        }
    };


    useEffect(() => {
        let interval;
        if (masterSong.mp3) {
            setDuration(formatTime(masterSong?.mp3?.duration));
            if (isPlaying) {
                masterSong?.mp3?.play();
                interval = setInterval(() => {
                    if (progress === 100) {
                        dispatch(pauseMaster());
                        resetEverything();
                    } else {
                        // Update the progress state first
                        const newProgress = Math.round((masterSong.mp3.currentTime / masterSong.mp3.duration) * 100);
                        setProgress(newProgress);
                        setCurrTime(formatTime(masterSong.mp3.currentTime));

                        // Calculate the color based on the new progress
                        const color = `rgb(${255 - newProgress * 2.55}, ${newProgress * 2.55}, 0)`;
                        document.querySelector('.active_progress').style.backgroundColor = color;
                    }
                }, 1000);
            } else {
                masterSong?.mp3?.pause();
            }
        }
        return () => clearInterval(interval);
    }, [masterSong, isPlaying]);


    const changeProgress = (e) => {
        setProgress(e.target.value);
        masterSong.mp3.currentTime =
            (e.target.value / 100) * masterSong.mp3.duration;
    };

    const [volume, setVolume] = useState(50);

    const changeVolume = (e) => {
        setVolume(e.target.value);
        masterSong.mp3.volume = e.target.value / 100;

        // Change color of volume bar
        const color = `rgb(${255 - e.target.value * 2.55}, ${e.target.value * 2.55}, 0)`;
        document.querySelector('#volume').style.backgroundColor = color;
    };

    const formatTime = (durationInSeconds) => {
        let minutes = Math.floor(durationInSeconds / 60);
        let seconds = Math.round(durationInSeconds % 60);

        let formattedDuration = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
        return formattedDuration;
    };

    const backwardSong = () => {
        if (songIdx <= 0)
            return;
        if (masterSong.mp3) {
            masterSong?.mp3?.pause();
            masterSong.mp3.currentTime = 0;
        }
        resetEverything();
        setSongIdx((prevstate) => prevstate - 1);
        dispatch(playSong(songs[songIdx - 1]));
    };

    const forwardSong = () => {
        if (songIdx >= 5 - 1)
            return;
        if (masterSong.mp3) {
            masterSong?.mp3?.pause();
            masterSong.mp3.currentTime = 0;
        }
        resetEverything();
        setSongIdx((prevstate) => prevstate + 1);
        dispatch(playSong(songs[songIdx + 1]));
    };

    return (
        <div className="fixed w-full flex px-2 items-center justify-between bottom-0 left-0 h-20 bg-black">
            <div className="w-2/12">
                <div className="flex items-center gap-2">
                    <img src={masterSong.img} alt="" className="h-12" />
                    <div>
                        <h3 className="text-xs font-medium mb-1">
                            {masterSong?.title || "Diljit Dosanjh"}
                        </h3>
                        <span className="text-[10px]">
                            {masterSong?.artist || "Diljit Dosanjh"}
                        </span>
                    </div>
                </div>
            </div>
            <div className="w-5/12">
                <div className="flex justify-center items-center mb-2 gap-6">
                    <BiShuffle />
                    <IoMdSkipBackward onClick={backwardSong} />
                    {isPlaying ? (
                        <button
                            onClick={handleMaster}
                            className="flex items-center rounded-[50%] bg-white justify-center p-2"
                        >
                            <FaPause className="text-black text-lg" />
                        </button>
                    ) : (
                        <button
                            onClick={handleMaster}
                            className="flex items-center rounded-[50%] bg-white justify-center p-2"
                        >
                            <FaPlay className="text-black text-lg" />
                        </button>
                    )}
                    <IoMdSkipForward />
                    <BiRepeat />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs">{currTime}</span>
                    <div className="relative w-full flex items-center">
                        <input
                            type="range"
                            name=""
                            min={0}
                            value={progress}
                            disabled={!masterSong.mp3}
                            onChange={changeProgress}
                            className="w-full block"
                            max={100}
                        />
                        <div
                            className="active_progress"
                            style={{
                                width: `${progress}%`,
                                backgroundColor: `rgb(${255 - progress * 2.55}, ${progress * 2.55}, 0)`
                            }}
                        ></div>
                    </div>
                    <span className="text-xs">{duration}</span>
                </div>
            </div>
            <div className="w-2/12 flex items-center gap-2">

                {volume <= 0 && <HiSpeakerXMark className="text-2xl" />}
                {volume > 0 && <HiSpeakerWave className="text-2xl" />}
                <div className="relative w-full flex items-center">
                    <input
                        type="range"
                        name=""
                        min={0}
                        value={volume}
                        disabled={!masterSong.mp3}
                        onChange={changeVolume}
                        className="w-full block"
                        max={100}
                    />
                    <div
                        id="volume"
                        className="active_progress"
                        style={{
                            width: `${volume}%`,
                            backgroundColor: `rgb(${255 - volume * 2.55}, ${volume * 2.55}, 0)`
                        }}
                    ></div>
                </div>

            </div>
        </div>
    );
};

export default SongBar;
