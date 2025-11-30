export type GalleryImage = {
  id: string; // Unique ID untuk key React
  url: string; // URL Cloudinary
  alt?: string; // Alt text opsional
  publicId?: string; // ID Cloudinary untuk penghapusan
};

export type GalleryBlock = {
  id: string; // Unique ID block
  variant: "left-large" | "right-large"; // Tipe layout
  images: (GalleryImage | null)[]; // Array 5 slot (bisa null jika kosong)
};

export type GallerySettings = {
  content: GalleryBlock[];
};
