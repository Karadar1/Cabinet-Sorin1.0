import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag, Clock } from "lucide-react";
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
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section with Parallax-like effect */}
            <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/30 z-10" /> {/* Overlay */}
                {post.image ? (
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#224e4d] to-[#356154]" />
                )}

                <div className="absolute inset-0 z-20 flex items-end pb-16 md:pb-24">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-4"
                        >
                            <div className="flex flex-wrap items-center gap-3 text-white/90 text-sm md:text-base font-medium">
                                <span className="bg-[#356154]/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                                    <Tag className="w-4 h-4" />
                                    {post.category}
                                </span>
                                <span className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <Calendar className="w-4 h-4" />
                                    {formattedDate}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight shadow-sm">
                                {post.title}
                            </h1>

                            <div className="flex items-center gap-3 text-white/90">
                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                    <User className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-white/60">Autor</span>
                                    <span className="font-semibold">{post.author}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 max-w-4xl -mt-10 relative z-30 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-xl p-6 md:p-12 border border-slate-100"
                >
                    {/* Back Button */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-slate-500 hover:text-[#224e4d] transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Înapoi la Blog
                    </Link>

                    {/* Resume/Intro */}
                    {post.resume && (
                        <div className="mb-10 p-6 bg-[#f1f5f9] rounded-xl border-l-4 border-[#224e4d]">
                            <p className="text-lg md:text-xl text-slate-700 italic leading-relaxed">
                                {post.resume}
                            </p>
                        </div>
                    )}

                    {/* Main Content */}
                    <article className="prose prose-lg prose-slate max-w-none prose-headings:text-[#224e4d] prose-a:text-[#356154] prose-img:rounded-xl">
                        {/* We render content as is, assuming it might be markdown later, but for now just text with newlines */}
                        <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                            {post.content}
                        </div>
                    </article>

                    {/* Footer of the article */}
                    <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
                        <div className="text-slate-400 text-sm">
                            Articol publicat în {post.category}
                        </div>
                        <div className="flex gap-4">
                            {/* Share buttons could go here */}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
