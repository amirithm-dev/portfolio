"use client"
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import { MonitorCog, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Theme(){
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(()=>{
        setMounted(true);
        return () => setMounted(false);
    },[]);

    if(!mounted) return null;

    return(
        <div
        className="flex items-center justify-around gap-4 w-40 min-w-40 h-12 rounded-full border dark:border-white/5 border-black/5 p-1 bg-linear-to-r from-[#fae9e0] to-[#ffd9c0aa] dark:from-[#241b18] dark:to-[#252424] overflow-hidden drop-shadow-2xl"
        >
            <div onClick={()=>{setTheme("system")}} className="relative w-full h-full flex items-center justify-center">
                {theme === "system" && (
                    <motion.div
                    transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                    layoutId="them-indicator"
                    className="w-full h-full rounded-full bg-[#db5461] absolute inset-0 z-0 drop-shadow-2xl"
                    >
                        
                    </motion.div>
                )}
                <MonitorCog className="z-10 relative h-11/12 text-zinc-800 dark:text-white active:scale-75 duration-200"></MonitorCog>
            </div>
            <div onClick={()=>{setTheme("light")}} className="relative w-full h-full flex items-center justify-center">
                {theme === "light" && (
                    <motion.div
                    transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                    layoutId="them-indicator"
                    className="w-full h-full rounded-full bg-[#db5461] absolute inset-0 z-0 drop-shadow-2xl"
                    >

                    </motion.div>
                )}
                <Sun className="z-10 relative h-11/12 text-zinc-800 dark:text-white active:scale-75 duration-200"></Sun>
            </div>
            <div onClick={()=>{setTheme("dark")}} className="relative w-full h-full flex items-center justify-center">
                {theme === "dark" && (
                    <motion.div
                        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                        layoutId="them-indicator"
                        className="w-full h-full rounded-full bg-[#db5461] absolute inset-0 z-0 drop-shadow-2xl"
                    >
                    </motion.div>
                )}
                <Moon className="z-10 relative h-11/12 text-zinc-800 dark:text-white active:scale-75 duration-200"></Moon>
            </div>
        </div>
    );
}