import { GoogleGenAI } from "@google/genai";
import { context } from "./context.json";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const allowed_origins: string[] = [
    "https://localhost:3000",
    "http://localhost:3000",
    "localhost:3000",
    String(process.env.APP_URL),
]

export async function POST(req: Request) {
    const origin: string = String(req.headers.get("origin"));
    if(!allowed_origins.includes(origin)){
        return Response.json("access denied.", {status: 403});
    }

    const body = await req.json();
    try {
        const interaction = await ai.interactions.create({
            model: "gemini-flash-lite-latest",
            stream: false,
            system_instruction: context,
            input: body.input,
        });
    
        return Response.json({response: interaction.output_text}, {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
        
    } catch (error) {
        console.error(error);
        return Response.json("Unavailable For Legal Reasons.", {status: 451});
    }
}