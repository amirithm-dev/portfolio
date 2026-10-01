import Link from "next/link";
import { BsLinkedin } from "react-icons/bs";
import { SiGithub, SiInstagram } from "react-icons/si"

export default function MinimalContact(){
    return(
        <div className="w-fit h-fit flex gap-4 absolute bottom-3 right-5">
            <Link target="_blank" href={"https://github.com/amirithm-dev"} className="group flex gap-2 items-center justify-start w-5 overflow-hidden hover:w-26 duration-500 rounded">
                <SiGithub className="min-w-5 min-h-5 text-zinc-700 dark:text-white opacity-70 group-hover:opacity-100 duration-300"></SiGithub>
                <p className="translate-x-full group-hover:translate-0 duration-500">Github</p>
            </Link>

            <Link target="_blank" href={"https://www.linkedin.com/in/amir-mohammad-sabzevari-32b8a2418"} className="group flex gap-2 items-center justify-start w-5 overflow-hidden hover:w-26 duration-500 rounded">
                <BsLinkedin className="min-w-5 min-h-5 text-zinc-700 dark:text-white opacity-70 group-hover:opacity-100 group-hover:text-blue-600 duration-300"></BsLinkedin>
                <p className="translate-x-full group-hover:translate-0 duration-500">LinkedIn</p>
            </Link>

            <Link target="_blank" href={"https://www.instagram.com/itsamirithm/"} className="group flex gap-2 items-center justify-start w-5 overflow-hidden hover:w-26 duration-500 rounded">
                <SiInstagram className="min-w-5 min-h-5 text-zinc-700 dark:text-white opacity-70 group-hover:opacity-100 group-hover:text-pink-600 duration-300"></SiInstagram>
                <p className="translate-x-full group-hover:translate-0 duration-500">Instagram</p>
            </Link>
            
        </div>
    );
}