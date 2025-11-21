import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import prisma from "@/lib/db";
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';

export const dynamic = 'force-dynamic';

// Define the type for the fetched blog post data
interface BlogPost {
  id: number;
  createdAt: Date; // Prisma returns Date objects for datetime fields
  title: string;
  image: string | null; // Assuming image could be null
  category: string;
  resume: string;
  author: string;
}

export default async function BlogPage() {
  // Explicitly type 'posts' array
  const posts: BlogPost[] = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' }
  }) as BlogPost[]; // Cast to ensure type compatibility

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-[#224e4d] text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Blog & Noutăți
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Articole, sfaturi și noutăți din lumea stomatologiei pentru sănătatea zâmbetului tău.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">Nu există articole momentan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-slate-100 flex flex-col"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-slate-200 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[#224e4d]/10 group-hover:bg-[#224e4d]/20 transition-colors duration-300" />
                  {/* Use the image from DB or a placeholder */}
                  {post.image && !post.image.includes('placeholder') ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">
                      <span className="text-sm font-medium">Imagine Articol</span>
                    </div>
                  )}

                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-[#224e4d] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{format(new Date(post.createdAt), 'dd MMM yyyy', { locale: ro })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>5 min</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 hover:text-[#224e4d] transition-colors">
                    <Link href={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-1">
                    {post.resume}
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                        <User className="w-3 h-3 text-slate-400" />
                      </div>
                      <span className="font-medium">{post.author}</span>
                    </div>

                    <Link
                      href={`/blog/${post.id}`}
                      className="text-[#224e4d] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Citește
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Newsletter / CTA Section (Optional) */}
        <div className="mt-16 bg-[#356154] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Nu rata noutățile noastre
            </h2>
            <p className="text-green-50 mb-8">
              Abonează-te pentru a primi sfaturi de îngrijire orală și oferte exclusive direct în inbox-ul tău.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Adresa ta de email"
                className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <button className="bg-[#224e4d] hover:bg-[#1a3b3a] text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                Abonează-te
              </button>
            </div>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
      </div>
    </main>
  );
}