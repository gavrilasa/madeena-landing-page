import Image from "next/image";
import type { GalleryProps } from "~/types/gallery";

export default function Gallery({ sections }: GalleryProps) {
  const nonEmptySections = sections.filter((s) => s.images.length > 0);

  return (
    <section className="py-8 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex flex-col gap-16">
          {nonEmptySections.map((section) => (
            <div
              key={section.id}
              className="grid grid-flow-dense grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-[250px_250px]"
            >
              {Array.from({ length: 5 }).map((_, index) => {
                const image = section.images.find((img) => img.order === index);
                const isBig = index === 0;
                let gridClass = "relative overflow-hidden rounded-xl ";

                if (isBig) {
                  gridClass += "col-span-2 row-span-2 h-[300px] md:h-full ";

                  if (section.type === "right-large") {
                    gridClass += "md:col-start-3 md:row-start-1";
                  } else {
                    gridClass += "md:col-start-1 md:row-start-1";
                  }
                } else {
                  gridClass += "col-span-1 row-span-1 h-[150px] md:h-full";
                }

                if (image) {
                  return (
                    <div key={image.id} className={`${gridClass} bg-gray-100`}>
                      <Image
                        src={image.url}
                        alt={image.alt ?? "Gallery Image"}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                        sizes={
                          isBig
                            ? "(max-width: 768px) 100vw, 50vw"
                            : "(max-width: 768px) 50vw, 25vw"
                        }
                      />
                    </div>
                  );
                }

                return <div key={`empty-${index}`} className={gridClass} />;
              })}
            </div>
          ))}
        </div>

        {nonEmptySections.length === 0 && (
          <div className="rounded-2xl border border-dashed bg-gray-50 py-20 text-center">
            <p className="text-muted-foreground">Gallery is empty.</p>
          </div>
        )}
      </div>
    </section>
  );
}
