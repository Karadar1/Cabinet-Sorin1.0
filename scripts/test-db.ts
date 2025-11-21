import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Connecting to database...');
        const posts = await prisma.blogPost.findMany({
            orderBy: { createdAt: 'desc' }
        });
        console.log(`Successfully fetched ${posts.length} posts.`);
        console.log('Sample post:', posts[0]);
    } catch (error) {
        console.error('Error fetching posts:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
