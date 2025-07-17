
import { GoogleGenAI } from "@google/genai";
import type { User, Job, Message } from '../types';

// IMPORTANT: This check is for the local dev environment.
// In a real deployment, the API key would be set in the environment.
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function* generateCoverLetterStream(job: Job, user: User) {
    const userSkills = user.skills.join(', ');
    const prompt = `
        My name is ${user.name}, and my professional tagline is "${user.tagline}". I have the following skills: ${userSkills}.
        My bio is: "${user.bio}".

        I am applying for the following job posted on the FOG platform:
        
        Job Title: "${job.title}"
        Posted By: ${job.postedBy.name}
        Job Description: "${job.description}"
        
        Please write a professional, confident, and concise cover letter for me.
        - Start the letter with "Dear ${job.postedBy.name},"
        - End with "Sincerely,\n${user.name}".
        - Keep the letter between 150 and 200 words.
        - Directly reference the job title.
        - Highlight how my skills (${userSkills}) and experience from my bio are a great match for the job requirements in the description.
        - Do not use markdown formatting.
    `;

    try {
        const responseStream = await ai.models.generateContentStream({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        for await (const chunk of responseStream) {
            yield chunk.text;
        }
    } catch (error) {
        console.error("Error generating cover letter:", error);
        yield "Error: Could not generate cover letter. Please check the console for details.";
    }
}

export async function generateMessageReply(lastMessage: Message, currentUser: User) {
    const prompt = `
        I am ${currentUser.name}. I am in a conversation about the job: "${lastMessage.jobSubject}".
        The last message I received was from the other person, and it says: "${lastMessage.content}".
        
        Please draft a professional and concise reply for me. Just provide the text of the reply, nothing else. Do not include a greeting or signature unless it feels natural.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating message reply:", error);
        return "Sorry, I couldn't generate a reply at this moment.";
    }
}