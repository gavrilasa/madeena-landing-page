import Gallery from "~/components/gallery/Gallery";
import { gallerySections } from "~/data/gallery/gallerySection";

export default function GalleryPage() {
  return (
    <main>
      <Gallery sections={gallerySections} />
    </main>
  );
}
