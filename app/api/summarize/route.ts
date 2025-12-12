import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();

    if (!content || typeof content !== "string" || !content.trim()) {
      return NextResponse.json(
        { error: "Note content is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.error("GROQ_API_KEY is not set in environment variables");
      return NextResponse.json(
        {
          error: "AI service is not configured. Please add your Groq API key.",
        },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant that creates concise, clear summaries of notes. Keep summaries brief (2-4 sentences) and focus on the main points.",
            },
            {
              role: "user",
              content: `Please summarize the following note:\n\n${content}`,
            },
          ],
          temperature: 0.7,
          max_tokens: 200,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Groq API error:", errorData);

      if (response.status === 401) {
        return NextResponse.json(
          { error: "Invalid API key. Please check your Groq API key." },
          { status: 401 }
        );
      } else if (response.status === 429) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again in a moment." },
          { status: 429 }
        );
      } else if (response.status === 500) {
        return NextResponse.json(
          {
            error:
              "Groq service is temporarily unavailable. Please try again later.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: `AI service error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    const summary = data.choices?.[0]?.message?.content?.trim();

    if (!summary) {
      return NextResponse.json(
        { error: "Failed to generate summary. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error in summarize API route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
