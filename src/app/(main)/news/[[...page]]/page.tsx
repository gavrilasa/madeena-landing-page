// src/app/(main)/news/[[...page]]/page.tsx

import { db } from "~/server/db";
import { NewsCard } from "~/components/news/NewsCard";
import { PaginationControls } from "~/components/common/PaginationControls";
import PageHeader from "~/components/common/PageHeader";

const ITEMS_PER_PAGE = 9;

interface NewsGridPageProps {
  params: Promise<{
    page?: string[];
  }>;
}

export async function generateStaticParams() {
  const totalCount = await db.newsArticle.count({
    where: { status: "PUBLISHED" },
  });
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const params = pages.map((page) => ({
    page: page === 1 ? undefined : [page.toString()],
  }));

  params.unshift({ page: undefined });

  return params.map((p) => ({
    page: p.page,
  }));
}

export default async function NewsGridPage({ params }: NewsGridPageProps) {
  const { page } = await params;

  const currentPage = page?.[0] ? parseInt(page[0]) : 1;
  const totalCount = await db.newsArticle.count({
    where: { status: "PUBLISHED" },
  });
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const articles = await db.newsArticle.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    skip: (currentPage - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
    select: {
      slug: true,
      title: true,
      summary: true,
      featuredImage: true,
      publishedAt: true,
    },
  });

  return (
    <main className="bg-white text-neutral-800">
      <PageHeader
        title="Berita Terbaru"
        subtitle="Baca berita, pengumuman, dan cerita terbaru dari kegiatan sekolah kami."
        imageUrl="https://res.cloudinary.com/dah2v3xbg/image/upload/v1763225823/TemplatePageHeader_tnecsg.webp"
      />

      <section className="py-16 sm:py-24">
        {articles.length > 0 ? (
          <>
            <div className="container mx-auto grid grid-cols-1 items-start gap-16 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
              {articles.map((article) => (
                <NewsCard key={article.slug} article={article} />
              ))}
            </div>

            <div className="container mx-auto mt-24 px-4 text-center sm:px-6 lg:px-8">
              {totalPages > 1 && (
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              )}
            </div>
          </>
        ) : (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-muted-foreground text-center">
              Belum ada berita yang diterbitkan.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
