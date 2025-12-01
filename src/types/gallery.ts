export interface GalleryImage {
  id: string;
  url: string;
  publicId: string | null;
  alt: string | null;
  order: number;
  sectionId: string;
}

export interface GallerySection {
  id: string;
  order: number;
  type: string;
  images: GalleryImage[];
}

export interface GalleryProps {
  sections: GallerySection[];
}

export interface GalleryEditorProps {
  initialData: GallerySection[];
}

export interface GallerySlotProps {
  id: string;
  image: GalleryImage | null;
  onUploadClick: () => void;
  onDeleteClick: (image: GalleryImage) => void;
  className?: string;
}

export interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (data: { url: string; publicId: string; alt?: string }) => void;
}

export interface SortableBlockProps {
  section: GallerySection;
  onDeleteBlock: () => void;
  onUploadRequest: (index: number) => void;
  onDeleteImage: (imageId: string) => void;
}

export interface CreateImageBody {
  sectionId: string;
  url: string;
  publicId?: string;
  alt?: string;
  order?: number;
}

interface ReorderImageItem {
  id: string;
  order: number;
  sectionId?: string;
}

export interface ReorderImagesBody {
  items: ReorderImageItem[];
}

export interface CreateSectionBody {
  type?: string;
}

interface ReorderSectionItem {
  id: string;
  order: number;
}

export interface ReorderSectionsBody {
  items: ReorderSectionItem[];
}
