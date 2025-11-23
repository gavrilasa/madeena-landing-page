import { db } from "~/server/db";
import { notFound } from "next/navigation";
import Image from "next/image";

import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import { type JSONContent } from "@tiptap/core";
import { Badge } from "~/components/ui/badge";
import { NewsCard } from "~/components/news/NewsCard";

interface NewsDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const articles = await db.newsArticle.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true },
  });

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

function formatDate(date: Date | null): string {
  if (!date) return "Tanggal tidak diketahui";
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const article = await db.newsArticle.findFirst({
    where: {
      slug: slug,
      status: "PUBLISHED",
    },
  });

  if (!article) {
    notFound();
  }

  const htmlContent = generateHTML(article.content as JSONContent, [
    StarterKit,
    Link.configure({
      HTMLAttributes: {
        target: null,
        rel: "noopener noreferrer nofollow",
      },
    }),
    ImageExtension,
  ]);

  const moreArticles = await db.newsArticle.findMany({
    where: {
      status: "PUBLISHED",
      slug: { not: slug },
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
    select: {
      slug: true,
      title: true,
      summary: true,
      featuredImage: true,
      publishedAt: true,
    },
  });

  return (
    <div className="bg-white text-neutral-800">
      <main className="container mx-auto max-w-6xl px-4 py-6 sm:py-12">
        <article className="flex flex-col items-center gap-8">
          <header className="flex max-w-4xl flex-col items-center gap-4">
            <Badge variant="outline" className="text-md px-4 py-1">
              News
            </Badge>
            <h1 className="text-primary text-center text-3xl leading-tight font-bold wrap-break-word md:text-5xl">
              {article.title}
            </h1>
            <p className="text-muted-foreground">
              {formatDate(article.publishedAt)}
            </p>
          </header>

          <div className="relative mb-8 aspect-video w-full max-w-5xl overflow-hidden rounded-lg">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
            />
          </div>

          <div
            className="prose prose-lg dark:prose-invert max-w-prose text-justify"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>

        {moreArticles.length > 0 && (
          <section className="mt-16 w-full border-t pt-12">
            <h2 className="text-primary mb-8 text-2xl font-bold md:text-4xl">
              More News
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {moreArticles.map((relatedArticle) => (
                <NewsCard key={relatedArticle.slug} article={relatedArticle} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
