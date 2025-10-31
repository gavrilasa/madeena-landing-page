import Image from "next/image";
import Link from "next/link";

type NewsArticleData = {
  slug: string;
  title: string;
  summary: string;
  featuredImage: string;
  publishedAt: Date | null;
};

function formatDate(date: Date | null): string {
  if (!date) return "Baru Diterbitkan";
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
  }).format(date);
}

export function NewsCard({ article }: { article: NewsArticleData }) {
  const img = article.featuredImage;
  const category = formatDate(article.publishedAt);
  const title = article.title;
  const desc = article.summary;

  return (
    <Link href={`/news/${article.slug}`} className="group block h-full">
      <div className="flex h-full flex-col space-y-6">
        <div className="relative h-56 w-full overflow-hidden rounded-lg shadow-lg">
          <Image
            src={img}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="grow space-y-4">
          <h3 className="group-hover:text-primary line-clamp-2 text-xl font-bold transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground wrap-break-words text-md line-clamp-2">
            {desc}
          </p>
          <p className="text-primary text-sm font-semibold">{category}</p>
        </div>
      </div>
    </Link>
  );
}
