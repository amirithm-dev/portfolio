"use client"

import { motion } from "motion/react"
import { JSX, useEffect, useState } from "react";
import { SiDocker, SiExpress, SiJavascript, SiLaravel, SiNextdotjs, SiPhp, SiPostgresql, SiReact, SiTailwindcss, SiTauri, SiTypescript } from "react-icons/si";

type SkillsType = {tittle: string, logo: JSX.Element}[];

const skills: SkillsType = [
    {
        tittle: "Express",
        logo: <SiExpress className="md:h-8 md:w-8 h-5 w-5"></SiExpress>,
    },
    {
        tittle: "Javascript",
        logo: <SiJavascript className="md:h-8 md:w-8 h-5 w-5"></SiJavascript>,
    },
    {
        tittle: "TypeScript",
        logo: <SiTypescript className="md:h-8 md:w-8 h-5 w-5"></SiTypescript>,
    },
    {
        tittle: "Next.js",
        logo: <SiNextdotjs className="md:h-8 md:w-8 h-5 w-5"></SiNextdotjs>,
    },
    {
        tittle: "React.js",
        logo: <SiReact className="md:h-8 md:w-8 h-5 w-5"></SiReact>,
    },
    {
        tittle: "PHP",
        logo: <SiPhp className="md:h-8 md:w-8 h-5 w-5"></SiPhp>,
    },
    {
        tittle: "Laravel",
        logo: <SiLaravel className="md:h-8 md:w-8 h-5 w-5"></SiLaravel>,
    },
    {
        tittle: "Postgresql",
        logo: <SiPostgresql className="md:h-8 md:w-8 h-5 w-5"></SiPostgresql>,
    },
    {
        tittle: "TailwindCss",
        logo: <SiTailwindcss className="md:h-8 md:w-8 h-5 w-5"></SiTailwindcss>,
    },
    {
        tittle: "Tauri",
        logo: <SiTauri className="md:h-8 md:w-8 h-5 w-5"></SiTauri>,
    },
    {
        tittle: "Docker",
        logo: <SiDocker className="md:h-8 md:w-8 h-5 w-5"></SiDocker>,
    },
]


export default function Skills({skills_title, locale}: {skills_title: string, locale: string}){
    const [hoveredSkill, setHoveredSkill] = useState<string>();
    const [randomSkill, setRandomSkill] = useState<string>("Node.js");

    useEffect(()=>{
        const intId = setInterval(() => {
            const length = skills.length;
            const randomIndex = Math.floor(Math.random() * length);
            setRandomSkill(skills[randomIndex].tittle);
        }, 4000);

        return ()=> clearInterval(intId);
    },[skills]);

    return(
        <div className="w-full flex flex-col items-center gap-5 cursor-default relative z-10 duration-300 text-zinc-800 dark:text-white my-72">

            <div className="backdrop-blur w-full max-w-11/12 sm:max-w-300 flex flex-col gap-10 rounded-xl p-5">
                <div className={(locale === "en" ? "text-left" : "text-right")}>
                    <p className="">{skills_title}</p>
                </div>

                <motion.div
                className="flex flex-wrap justify-center h-fit gap-5"
                >
                    {skills.map((skill, key)=>{
                        return(
                            <motion.div
                            initial={{ opacity: 0, y: -100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: Number(`0.${key}`), type: "spring", stiffness: 200, damping: 15 }}
                            viewport={{ margin: "-150px", once: true }}
                            onTouchStart={()=>{setHoveredSkill(skill.tittle)}}
                            onHoverStart={()=>{setHoveredSkill(skill.tittle)}}
                            key={key}
                            className="relative"
                            >
                                {randomSkill === skill.tittle && (
                                    <motion.div
                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                    layoutId="skill-indicator"
                                    className="absolute inset-0 z-0 rounded-xl overflow-hidden bg-radial from-50% from-transparent to-[#db5461]/10 drop-shadow-2xl"
                                    >
                                        <div className="w-full h-full bg-[#db5461] blur-2xl opacity-40"></div>
                                    </motion.div>
                                )}
                                {hoveredSkill === skill.tittle && (
                                    <motion.div
                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                    layoutId="skill-indicator-random"
                                    className="absolute inset-0 z-0 rounded-xl overflow-hidden border-2 dark:border-zinc-700 border-[#db5461]/50"
                                    >
                                    </motion.div>
                                )}
                                <div className="w-full h-full relative z-10 flex items-center gap-2 p-3">
                                    {skill.logo}
                                    <span className="opacity-30">|</span>
                                    <span className="font-bold md:text-lg select-none">{skill.tittle}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

        </div>
    );
}