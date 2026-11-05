import { notFound } from "next/navigation";
import { getBlogPostBySlug, BLOG_POSTS } from "@/lib/blogData";
import BlogDetailClient from "@/components/BlogDetailClient";

export function generateStaticParams() {
  const slugs: { slug: string }[] = [];
  BLOG_POSTS.forEach((post) => {
    slugs.push({ slug: post.slug });
    post.aliases?.forEach((alias) => {
      slugs.push({ slug: alias });
    });
  });
  return slugs;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return <BlogDetailClient post={post} relatedPosts={relatedPosts} />;
}
