import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI with the provided API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define the instruction message for the OpenAI API
const instructionMessage = {
  role: "system",
  content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanation.",
};

// Define the POST request handler
export async function POST(req: Request) {
  try {
    // Authenticate the user
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    // Check for user authentication
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the OpenAI API key is configured
    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }

    // Validate the messages input
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    // Create a chat completion request to the OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [instructionMessage, ...messages],
    });

    // Return the response from OpenAI
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    // Handle and log errors
    console.error('[CONVERSATION_ERROR]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
