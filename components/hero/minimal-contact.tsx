import { useEffect, useState } from "react";
import { BsLinkedin } from "react-icons/bs";
import { SiGithub, SiInstagram } from "react-icons/si"
import { motion } from "motion/react";

export default function MinimalContact(){
    const [hoveredOption, setHoveredOption] = useState<string>();

    const contact = [
        {
            title: "Github",
            link: "https://github.com/amirithm-dev",
            logo: <SiGithub className="min-w-5 min-h-5 duration-300 text-zinc-700 dark:text-white opacity-80 group-hover:opacity-100 "/>,
            accentColor: "#000000"
        },
        {
            title: "LinkedIn",
            link: "https://www.linkedin.com/in/amir-mohammad-sabzevari-32b8a2418",
            logo: <BsLinkedin className="min-w-5 min-h-5 duration-300 text-zinc-700 dark:text-white opacity-80 group-hover:opacity-100 group-hover:text-[#0C64BE] "/>,
            accentColor: "#0C64BE"
        },
        {
            title: "Instagram",
            link: "https://www.instagram.com/itsamirithm/",
            logo: <SiInstagram className="min-w-5 min-h-5 duration-300 text-zinc-700 dark:text-white opacity-80 group-hover:opacity-100 group-hover:text-[#F60580] "/>,
            accentColor: "#F60580"
        },
    ];

    useEffect(()=>{
        const timeoutId = setTimeout(() => {
            setHoveredOption(undefined);
        }, 2000);

        return ()=> clearTimeout(timeoutId);
    },[hoveredOption]);

    return(
        <div className="w-fit h-fit flex gap-4 absolute bottom-3 right-5">
            {contact.map((value, key)=>{
                return(
                    <motion.a target="_blank" key={key} href={value.link}
                    onHoverStart={()=>{setHoveredOption(value.title)}}
                    onTouchStart={()=>{setHoveredOption(value.title)}}
                    className={(hoveredOption === value.title ? "w-26" : "w-5") + " group flex gap-2 items-center justify-start w-5 h-5 overflow-hidden duration-500"}
                    >
                        {value.logo}
                        <p>{value.title}</p>
                    </motion.a>
                )
            })}
        </div>
    );
}