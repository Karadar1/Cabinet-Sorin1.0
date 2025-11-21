import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    Calendar,
    User,
    Tag,
    Share2,
    Clock,
    Stethoscope,
    ChevronRight
} from "lucide-react";
import prisma from "@/lib/db";
import { format } from "date-fns";
import { ro } from "date-fns/locale";
import * as motion from "framer-motion/client";

export const dynamic = 'force-dynamic';

interface BlogPostPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { id } = await params;
    const postId = parseInt(id);

    if (isNaN(postId)) notFound();

    const post = await prisma.blogPost.findUnique({
        where: { id: postId },
    });

    if (!post) notFound();

    const formattedDate = format(new Date(post.createdAt), "d MMMM yyyy", { locale: ro });
    const wordCount = post.content.split(/\s+/g).length;
    const readingTime = Math.ceil(wordCount / 200);

    // Animation settings
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-[#fcfbf9] font-sans selection:bg-[#224e4d] selection:text-white">

            {/* 1. HEADER SECTION */}
            <header className="pt-32 pb-12 md:pt-40 md:pb-16 px-6">
                <div className="container mx-auto max-w-5xl text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6 }}
                        variants={fadeInUp}
                        className="space-y-8"
                    >
                        {/* Breadcrumb */}
                        <div className="flex justify-center items-center gap-2 text-sm font-medium text-stone-500 mb-8">
                            <Link href="/blog" className="hover:text-[#224e4d] transition-colors">Blog</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-[#224e4d] bg-[#224e4d]/5 px-2 py-0.5 rounded-md">
                                {post.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-stone-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
                            {post.title}
                        </h1>

                        {/* Meta Data */}
                        <div className="flex flex-wrap justify-center items-center gap-6 text-stone-500 text-sm md:text-base border-t border-b border-stone-200 py-6 w-fit mx-auto px-8 md:px-12">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#224e4d]" />
                                {formattedDate}
                            </div>
                            <div className="w-1 h-1 bg-stone-300 rounded-full" />
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[#224e4d]" />
                                {readingTime} min citire
                            </div>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* 2. IMAGE SECTION (UPDATED) */}
            <div className="container mx-auto max-w-5xl px-4 md:px-6 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    // Removed "aspect-ratio" class. 
                    // "overflow-hidden" keeps the rounded corners clean.
                    // "bg-stone-100" provides a nice background while image loads.
                    className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-[#224e4d]/10 bg-stone-100 border border-stone-100"
                >
                    {post.image ? (
                        // Using width/height={0} + sizes + "w-full h-auto" allows the image to 
                        // maintain its natural aspect ratio so nothing is cropped.
                        <Image
                            src={post.image}
                            alt={post.title}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full h-auto object-contain"
                            priority
                        />
                    ) : (
                        // Fallback if no image
                        <div className="w-full h-[400px] bg-gradient-to-br from-[#224e4d] to-[#1a3b3a] flex items-center justify-center">
                            <Stethoscope className="w-20 h-20 text-white/20" />
                        </div>
                    )}
                </motion.div>
            </div>

            {/* 3. CONTENT GRID */}
            <div className="container mx-auto max-w-6xl px-4 md:px-6 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* SIDEBAR (Sticky on Desktop) */}
                    <aside className="lg:col-span-3 hidden lg:block">
                        <div className="sticky top-32 space-y-8">
                            {/* Author Card */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 text-center">
                                <div className="w-20 h-20 mx-auto rounded-full bg-stone-100 border-2 border-white shadow-md mb-4 overflow-hidden flex items-center justify-center">
                                    <User className="w-8 h-8 text-stone-400" />
                                </div>
                                <p className="text-xs uppercase tracking-widest text-stone-400 font-bold mb-1">Scris de</p>
                                <h3 className="font-bold text-stone-800 text-lg">{post.author}</h3>
                                <p className="text-xs text-[#224e4d] font-medium mt-1">Medic Veterinar</p>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col gap-3">
                                <Link
                                    href="/blog"
                                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 hover:border-stone-300 transition-all text-sm font-semibold"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Înapoi
                                </Link>
                                <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#224e4d] text-white hover:bg-[#1a3b3a] transition-all text-sm font-semibold shadow-lg shadow-[#224e4d]/20">
                                    <Share2 className="w-4 h-4" />
                                    Distribuie
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* MAIN ARTICLE */}
                    <main className="lg:col-span-8 lg:col-start-5">
                        <motion.article
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            transition={{ delay: 0.4 }}
                        >
                            {/* Resume Quote */}
                            {post.resume && (
                                <div className="mb-12 relative">
                                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[#224e4d] rounded-full opacity-30 hidden md:block" />
                                    <p className="text-xl md:text-2xl leading-relaxed text-stone-600 font-serif italic pl-0 md:pl-8">
                                        {post.resume}
                                    </p>
                                </div>
                            )}

                            {/* Text Content */}
                            <div className="prose prose-lg md:prose-xl prose-stone max-w-none
                                prose-headings:font-bold prose-headings:text-[#1c1c1c] prose-headings:tracking-tight
                                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                                prose-p:text-stone-600 prose-p:leading-[1.8]
                                prose-a:text-[#224e4d] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                                prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-10
                                prose-blockquote:border-l-4 prose-blockquote:border-[#224e4d] prose-blockquote:bg-[#224e4d]/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                                prose-li:marker:text-[#224e4d]
                            ">
                                <div className="whitespace-pre-wrap">
                                    {post.content}
                                </div>
                            </div>

                            {/* Mobile Author (visible only on phone) */}
                            <div className="lg:hidden mt-12 pt-8 border-t border-stone-200">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center">
                                        <User className="w-6 h-6 text-stone-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-stone-400 uppercase font-bold">Autor</p>
                                        <p className="font-bold text-stone-900">{post.author}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="mt-16 flex flex-wrap gap-2">
                                <span className="px-4 py-2 rounded-full bg-stone-100 text-stone-600 text-sm font-medium flex items-center gap-2">
                                    <Tag className="w-3.5 h-3.5" />
                                    {post.category}
                                </span>
                            </div>

                            {/* Medical Disclaimer */}
                            <div className="mt-12 p-6 bg-amber-50 border border-amber-100 rounded-xl flex gap-4 items-start">
                                <div className="mt-1 text-amber-600">
                                    <Stethoscope className="w-5 h-5" />
                                </div>
                                <div className="text-sm text-amber-900/80 leading-relaxed">
                                    <strong>Notă Medicală:</strong> Informațiile prezentate în acest articol au scop pur informativ și educațional. Nu înlocuiesc consultația medicală de specialitate. Pentru orice problemă de sănătate a animalului dumneavoastră, vă rugăm să ne contactați pentru o programare.
                                </div>
                            </div>

                        </motion.article>
                    </main>
                </div>
            </div>
        </div>
    );
}