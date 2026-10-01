"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Biography from "./biography";
import { Dot, Ellipsis } from "lucide-react";
import MinimalContact from "./minimal-contact";

export default function Hero({locale}: {locale: string}) {
    const imageCardRef = useRef<HTMLDivElement>(null);
    const {theme} = useTheme();

    const tiltCard = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>)=>{
        if(!imageCardRef.current) return;

        const card = imageCardRef.current;
        const rect = card.getBoundingClientRect();

        let x: number;
        let y: number;

        if("clientX" in e){
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }else{
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        }



        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const smoothness = 20;

        card.style.transform = `
        perspective(1000px)
        rotateX(${-(y - centerY) / smoothness}deg)
        rotateY(${(x - centerX) / smoothness}deg)
        `
    }

    const alignCard = ()=>{
        if(!imageCardRef.current) return;
        const card = imageCardRef.current;

        card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    }

    const [slice, setSlice] = useState(1);
    const text = "Amirithm";
    const [writtenText, setWrittenText] = useState<string[]>([]);
    const showBio = slice > text.length;

    useEffect(()=>{
        if(slice > text.length) return;

        const writeSpeed = Math.floor(Math.random() * 200);

        const timeoutId = setTimeout(() => {  
            setSlice(prev => prev + 1);
            setWrittenText(prev => [...prev, text.slice(slice - 1, slice)]);
        }, writeSpeed);

        return () => clearTimeout(timeoutId);
    },[slice]);

    const [showMore, setShowMore] = useState(false);

    useEffect(()=>{
        function handleScroll(){
            setShowMore(true);
            document.removeEventListener("scroll", handleScroll);
        }

        document.addEventListener("scroll", handleScroll);

        return () => document.removeEventListener("scroll", handleScroll); 
    },[]);

    return(
        <div className="w-full flex justify-center relative">
            <div className="w-11/12 max-w-300 h-fit mt-72 relative flex justify-center">
                <motion.div
                onMouseUp={alignCard}
                onTouchStart={tiltCard} onTouchMove={tiltCard} onTouchEnd={alignCard}
                onMouseLeave={alignCard} onMouseMove={tiltCard} ref={imageCardRef}
                className="w-52 h-52 md:w-80 md:h-80 overflow-hidden rounded-3xl rounded-tl-[3rem] flex justify-center items-center drop-shadow-2xl ring-2 dark:ring-zinc-800 ring-zinc-500 duration-300 absolute z-10 -top-32 left-1/2 -translate-x-1/2 lg:-top-20 lg:-left-5 lg:translate-0 select-none">
                    <Image alt="profile" src={"/images/profile-dark.JPG"} width={800} height={800} className="duration-300 dark:opacity-100 opacity-0 absolute"></Image>
                    <Image alt="profile" src={"/images/profile-light.jpg"} width={800} height={800} className="duration-300 dark:opacity-0 opacity-100 absolute"></Image>
                    <motion.div 
                    initial={{ left: -100 }} animate={{ left: "120%" }} transition={{ damping: 10, stiffness: 40, delay: 2.5, type: "spring" }}
                    className="w-10 h-[120%] rotate-20 absolute z-20 bg-linear-to-l from-transparent dark:via-white/30 via-[#c5c5c5]/30 to-transparent"/>
                    <motion.div 
                    initial={{ left: -100 }} animate={{ left: "120%" }} transition={{ damping: 10, stiffness: 40, delay: 2.55, type: "spring" }}
                    className="w-5 h-[120%] rotate-20 absolute z-20 bg-linear-to-l from-transparent dark:via-white/30 via-[#c5c5c5]/30 to-transparent"/>
                </motion.div>

                <div className="w-10/12 min-h-100 h-fit pb-10 bg-linear-to-tl dark:from-[#1b100c] from-[#e491919f] to-80% to-transparent rounded-3xl duration-300 drop-shadow-2xl overflow-hidden">
                    <div className="absolute top-2 right-2 w-fit h-fit hidden md:flex gap-2 rotate-20">
                        <div className="w-2 h-2 rounded-full dark:bg-[#0B0B0B] bg-[#F7F7F5] duration-300 ring ring-[#808080]/15 drop-shadow-2xl"></div>
                        <div className="w-2 h-2 rounded-full dark:bg-[#0B0B0B] bg-[#F7F7F5] duration-300 ring ring-[#808080]/15 drop-shadow-2xl"></div>
                    </div>

                    <div className="lg:ml-65 lg:mt-0 mt-24 p-2">
                        <div className="w-full flex justify-center lg:justify-start items-center my-10">
                            <div className="text-4xl lg:text-7xl w-fit text-zinc-700 dark:text-white select-none">
                                {writtenText.map((value, key)=>{
                                    return(
                                        <span key={key} className="hover:text-[#db5461] hover:px-2 hover:blur-[2px] duration-500">
                                            {value}
                                        </span>
                                    );
                                })}
                            </div>
                            <div className="w-0.5 h-10 md:h-15 dark:bg-white bg-zinc-950 animate-pulse rounded-full ml-1"></div>
                        </div>

                        <div className={(showBio ? "opacity-100" : "opacity-0") + " delay-400 duration-300 lg:ml-5"}>
                            <Biography showMore={showMore} locale={locale}></Biography>

                            <div
                            onClick={()=>{setShowMore(prev => !prev)}}
                            className={"select-none cursor-pointer drop-shadow-2xl border dark:border-zinc-950 border-zinc-200 dark:bg-zinc-800 bg-zinc-100 w-fit h-fit rounded-lg duration-300 mt-5"}
                            >
                                <div className="flex items-center justify-center relative w-8 h-5 opacity-70 overflow-hidden">
                                    <Ellipsis className={(showMore ? "-translate-y-30" : "translate-0") + " dark:text-white text-zinc-800 duration-300 ease-in-out absolute"}/>
                                    <Dot className={(showMore ? "translate-0" : "translate-y-30") + " dark:text-white text-zinc-800 duration-300 ease-in-out absolute"}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <MinimalContact></MinimalContact>

                </div>
            </div>
        </div>
    );
}