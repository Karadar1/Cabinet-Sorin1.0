import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.title || !body.content || !body.author) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const post = await prisma.blogPost.create({
      data: {
        title: body.title,
        resume: body.resume || "",
        content: body.content,
        category: body.category || "General",
        author: body.author,
        image: body.image || "",
      }
    });
    return NextResponse.json(post);
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
  }
}
