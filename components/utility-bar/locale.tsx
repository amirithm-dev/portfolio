"use client"
import { Globe } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Locale({locale}: {locale: string}){
    const [showLocales, setShowLocales] = useState<boolean>(false);
    const localeSelectorRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const changeLocale = (locale: "en" | "fa")=>{
        cookieStore.set("locale", locale)
        .then(()=>{
            setShowLocales(false);
            router.refresh();
        });
    }

    useEffect(()=>{
        function handleClickOutside(e: MouseEvent){
            if(localeSelectorRef.current && !localeSelectorRef.current.contains(e.target as Node)){
                setShowLocales(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    },[]);

    return(
        <div
        ref={localeSelectorRef}
        className={
            (showLocales ? "h-30 rounded-2xl" : "h-12 rounded-3xl") +
            " group text-white flex justify-center items-start border dark:border-white/5 border-black/5 drop-shadow-2xl w-25 bg-linear-to-r from-[#ffd9c0aa] to-[#fae9e0] dark:from-[#241b18] dark:to-[#252424] overflow-hidden transition-[width,height,border-radius] duration-300"}
        >
            <div className="flex flex-col justify-start gap-1 w-9/12 select-none">
                <div onClick={()=>{setShowLocales(!showLocales)}} className="flex w-full h-11 items-center justify-between group">
                    <Globe className="text-zinc-800 dark:text-white group-hover:text-[#E85A32] duration-300"></Globe>
                    <span className="opacity-20 dark:text-white text-black">|</span>
                    <span className="text-zinc-800 dark:text-white">{locale.toUpperCase()}</span>
                </div>

                <div className="w-full h-full"></div>

                <div className="flex flex-col gap-2">
                    <button onClick={()=>{changeLocale("fa")}} className="relative">
                        {locale === "fa" && (
                            <motion.div
                            layoutId="localeIndicator"
                            transition={{ type: "spring", stiffness: 150, damping: 30 }}
                            className="inset-0 absolute border-x border-[#E85A32]"
                            />
                        )}
                        <p className="dark:text-white text-zinc-800">FA</p>
                        
                    </button>
                    <button onClick={()=>{changeLocale("en")}} className="relative">
                        {locale === "en" && (
                            <motion.div
                            layoutId="localeIndicator"
                            transition={{ type: "spring", stiffness: 150, damping: 30  }}
                            className="inset-0 absolute border-x border-[#E85A32]"
                            />
                        )}
                        <p className="dark:text-white text-zinc-800">EN</p>
                        
                    </button>
                </div>
            </div>
        </div>
    );
}