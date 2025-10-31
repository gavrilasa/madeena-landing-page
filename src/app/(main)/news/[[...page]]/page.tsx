// src/app/news/[[...page]]/page.tsx

import { db } from "~/server/db";
import { NewsCard } from "~/components/news/NewsCard";
import { PaginationControls } from "~/components/common/PaginationControls";
const ITEMS_PER_PAGE = 9;

interface NewsGridPageProps {
  params: {
    page?: string[];
  };
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
  const currentPage = params.page?.[0] ? parseInt(params.page[0]) : 1;
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
    <section className="py-16 pt-32 sm:py-24 sm:pt-40">
      <div className="container mx-auto mb-16 text-center">
        <h2 className="my-4 text-3xl font-bold">Berita Terbaru Kami</h2>
        <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
          Baca berita, pengumuman, dan cerita terbaru dari kegiatan sekolah
          kami.
        </p>
      </div>

      {articles.length > 0 ? (
        <>
          <div className="container mx-auto grid grid-cols-1 items-start gap-16 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <NewsCard key={article.slug} article={article} />
            ))}
          </div>

          <div className="mt-24 text-center">
            {totalPages > 1 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
              />
            )}
          </div>
        </>
      ) : (
        <p className="text-muted-foreground text-center">
          Belum ada berita yang diterbitkan.
        </p>
      )}
    </section>
  );
}
