import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag, Share2, Clock } from "lucide-react";
import prisma from "@/lib/db";
import { format } from "date-fns";
import { ro } from "date-fns/locale";
import * as motion from "framer-motion/client";

// Force dynamic rendering since we're using database
export const dynamic = 'force-dynamic';

interface BlogPostPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { id } = await params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
        notFound();
    }

    const post = await prisma.blogPost.findUnique({
        where: { id: postId },
    });

    if (!post) {
        notFound();
    }

    const formattedDate = format(new Date(post.createdAt), "d MMMM yyyy", { locale: ro });

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-[#224e4d] selection:text-white">
            {/* Hero Section with Parallax-like effect */}
            <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/40 z-10" /> {/* Base Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent z-10" /> {/* Gradient Overlay */}

                {post.image ? (
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#224e4d] to-[#1a3b3a]" />
                )}

                <div className="absolute inset-0 z-20 flex items-end pb-20 md:pb-32">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-6"
                        >
                            {/* Metadata Pills */}
                            <div className="flex flex-wrap items-center gap-3 text-white/90 text-sm font-medium tracking-wide">
                                <span className="bg-[#356154]/90 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg shadow-black/5 border border-white/10">
                                    <Tag className="w-3.5 h-3.5" />
                                    {post.category}
                                </span>
                                <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg shadow-black/5 border border-white/10">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {formattedDate}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight drop-shadow-lg">
                                {post.title}
                            </h1>

                            {/* Author */}
                            <div className="flex items-center gap-4 pt-2">
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex flex-col text-white">
                                    <span className="text-xs font-medium text-white/70 uppercase tracking-wider">Autor</span>
                                    <span className="font-semibold text-lg">{post.author}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 max-w-4xl -mt-20 relative z-30 mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-8 md:p-16 border border-slate-100"
                >
                    {/* Back Button */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-slate-400 hover:text-[#224e4d] transition-colors mb-10 group font-medium text-sm uppercase tracking-wide"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Înapoi la Blog
                    </Link>

                    {/* Resume/Intro */}
                    {post.resume && (
                        <div className="mb-12 p-8 bg-[#224e4d]/5 rounded-2xl border-l-4 border-[#224e4d]">
                            <p className="text-xl md:text-2xl text-[#224e4d] font-serif italic leading-relaxed">
                                &ldquo;{post.resume}&rdquo;
                            </p>
                        </div>
                    )}

                    {/* Main Content */}
                    <article className="prose prose-lg md:prose-xl prose-slate max-w-none 
                        prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight
                        prose-p:text-slate-600 prose-p:leading-loose
                        prose-a:text-[#224e4d] prose-a:no-underline prose-a:border-b prose-a:border-[#224e4d]/30 hover:prose-a:border-[#224e4d] prose-a:transition-colors
                        prose-strong:text-slate-900 prose-strong:font-bold
                        prose-blockquote:border-l-[#224e4d] prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-slate-700
                        prose-img:rounded-2xl prose-img:shadow-lg"
                    >
                        {/* Drop Cap Effect for the first paragraph */}
                        <div className="whitespace-pre-wrap first-letter:text-7xl first-letter:font-bold first-letter:text-[#224e4d] first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]">
                            {post.content}
                        </div>
                    </article>

                    {/* Footer of the article */}
                    <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-slate-400 text-sm font-medium">
                            Publicat în <span className="text-slate-900">{post.category}</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-slate-500 text-sm font-medium">Distribuie:</span>
                            <button className="w-10 h-10 rounded-full bg-slate-50 hover:bg-[#224e4d] text-slate-600 hover:text-white flex items-center justify-center transition-all duration-300 border border-slate-200 hover:border-transparent">
                                <Share2 className="w-4 h-4" />
                            </button>
                            {/* Add more social buttons here if needed */}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
