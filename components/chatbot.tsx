"use client"
import { Bot, BotMessageSquare, ChevronUp, Send, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ThinkingOrb } from "thinking-orbs";


type Message = {
    text: string,
    type: "QUESTION" | "ANSWER",
    id: string
}

const openingText = `Hi! I'm Amir's AI assistant. 🤖 \n\n
Ask me anything about Amir, his projects, skills, or experience.`;

export default function Chatbot() {
    const [showChatbot, setShowChatbot] = useState<boolean>(false);
    const [reasoning, setReasoning] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([{id: crypto.randomUUID(), text: openingText, type: "ANSWER"}]);
    const chatbotRef = useRef<HTMLDivElement>(null);
    const conversationEndRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    async function chat(input: string){
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                body: JSON.stringify({
                    input: input
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            
            if(response.ok && response.body){
                const data = await response.json() as {response: string};
                setMessages((prev)=> [...prev, {id: crypto.randomUUID(), text: data.response, type: "ANSWER"}]);
            }else{
                setMessages((prev)=> [...prev, {id: crypto.randomUUID(), text: "AI assistant currently unavailable 🙁", type: "ANSWER"}]);
            }
            
        } catch (error) {
            console.error(error);
            setMessages((prev)=> [...prev, {id: crypto.randomUUID(), text: "an unknown error occurred while reasoning 🤔", type: "ANSWER"}]);
        }
    }
    
    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if(reasoning) return;
        setReasoning(true);
        const form = new FormData(e.currentTarget);
        const input = form.get("input")?.toString().trim();
        if(!input){
            return setReasoning(false);
        };
        setMessages((prev)=> [...prev, {id: crypto.randomUUID(), text: input, type: "QUESTION"}]);
        await chat(input);
        if(formRef.current) formRef.current.reset();
        setReasoning(false);
    }

    useEffect(()=>{
        function handleClickOutside(e: MouseEvent){
            if(chatbotRef.current && !chatbotRef.current.contains(e.target as Node)){
                setShowChatbot(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    },[setShowChatbot]);

    useEffect(()=>{
        if(conversationEndRef.current){
            conversationEndRef.current.scrollIntoView({
                behavior: "smooth"
            });
        }
    },[messages]);

    return(
        <motion.div
        initial={{ opacity: 0, x: "200%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10, delay: 1.5 }}
        ref={chatbotRef}
        className={(showChatbot ? "w-10/12 md:w-120 h-full" : "w-17 h-17 border-transparent") + " max-h-10/12 bg-linear-to-tl from-[#f3e5d7] to-[#ffd9c3] dark:from-[#3b3535] dark:to-[#2F2823] bottom-10 right-10 rounded-3xl fixed overflow-hidden flex items-center flex-col justify-between z-20 drop-shadow-2xl border-2 border-black/5 dark:border-white/5 transition-[width,height] duration-300"}
        >
            <motion.div
            initial={{ translateY: "-100%", opacity: 0 }}
            animate={{ translateY: showChatbot ? 0 : "-100%", opacity: showChatbot ? 1 : 0 }}
            transition={{ delay: showChatbot ? 1 : 0, damping: 10, stiffness: 100 }}
            className="absolute top-0 left-0 w-fit p-3 flex items-center text-center z-30 rounded-br-2xl overflow-hidden backdrop-blur-lg"
            >
                <div className="rounded-full drop-shadow-2xl bg-green-600 w-2 h-2 mr-2"></div>
                <Bot width={30} height={30} strokeWidth={2} color="#E85A32"></Bot>
            </motion.div>

            <div className={(showChatbot ? "opacity-100" : "opacity-0") + " w-full h-full overflow-y-scroll scrollbar-none duration-300"}>
                <div className="h-20"></div>
                <div className="w-full flex flex-col gap-5">
                    {messages.map((message, key)=>{
                        if(message.type === "ANSWER"){
                            const paragraphs = String(message.text).split("\n").filter((p): p is string => !!p);
                            return(
                                <motion.div key={message.id}
                                initial={{ translateX: "-200%" }}
                                animate={{ translateX: showChatbot ? 0 : "-200%" }}
                                transition={{ delay: Number(`0.0${key}`), type: "spring", stiffness: 150, damping: 15 }}
                                className="w-fit max-w-11/12 rounded-xl rounded-bl-none p-2 ml-5"
                                >
                                    {paragraphs.map((paragraph, key)=>{
                                        return(
                                            <p key={key} className="min-h-10 text-zinc-900 dark:text-white">{paragraph}</p>
                                        );
                                    })}
                                </motion.div>
                            )
                        }else{
                            return(
                                <motion.div key={message.id}
                                initial={{ translateX: "200%" }}
                                animate={{ translateX: showChatbot ? 0 : "200%" }}
                                transition={{ delay: Number(`0.2${key}`), type: "spring", stiffness: 150, damping: 15 }}
                                className="w-fit max-w-11/12 bg-[#E85A32] rounded-xl rounded-br p-2 ml-auto mr-5"
                                >
                                    <p className="text-zinc-900">{message.text}</p>
                                </motion.div>
                            )
                        }
                    })}
                    <div className="opacity-0 w-full h-32" ref={conversationEndRef}></div>
                </div>

            </div>

            <motion.div
            initial={{ opacity: 0, scale: 0}}
            animate={showChatbot && reasoning ? { opacity: 1, scale: 1 } : {opacity: 0, scale: 0}}
            className="flex justify-center items-center gap-5 pr-4 w-fit rounded-full bg-white/30 dark:bg-black/10 backdrop-blur-md border-2 border-white/5 absolute bottom-25 z-10 drop-shadow-2xl overflow-hidden"
            >
                <ThinkingOrb state="composing"></ThinkingOrb>
                <p className="text-black dark:text-white">Thinking...</p>
            </motion.div>

            <motion.form
            onSubmit={handleSubmit}
            ref={formRef}
            initial={{ translateY: "200%" }}
            animate={{ translateY: showChatbot ? 0 : "200%" }}
            transition={{ delay: showChatbot ? 0.2 : 0, stiffness: 200, damping: 15, type: "spring" }}
            className="w-11/12 absolute bottom-5 flex items-center bg-transparent"
            >
                <input autoComplete="off" type="text" name="input" placeholder="Ask me ..." className="w-full h-18 rounded-2xl text-black dark:text-white bg-[#F7F7F5] dark:bg-[#0B0B0B] pl-3 pr-12 outline-none duration-300 border-2 border-white/10 drop-shadow-2xl"/>
                <label htmlFor="submit" className="w-12 h-14 group flex justify-center items-center right-1 absolute p-1 bg-linear-to-r from-transparent to-white dark:to-black">
                    <input hidden type="submit" value="submit" id="submit"/>
                    <Send strokeWidth={1} color="#E85A32" className={(reasoning ? "opacity-20" : "opacity-100") + " w-10/12 h-10/12 group-hover:-translate-y-1 duration-300"}/>
                </label>
            </motion.form>

            <BotMessageSquare 
            onClick={()=>{setShowChatbot(true)}} color="#E85A32" strokeWidth={2} 
            className={(showChatbot ? "opacity-0 pointer-events-none translate-x-[200%]" : "opacity-100 pointer-events-auto translate-0") + " w-18 h-18 rotate-y-180 hover:rotate-x-20 hover:-rotate-z-20 duration-500 absolute z-40 -bottom-1 -right-0.5 p-4"}
            />
        </motion.div>
    );
}