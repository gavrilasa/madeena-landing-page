"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  LinkIcon,
  Unlink,
  List,
  ListOrdered,
  ImagePlus,
  Loader2,
} from "lucide-react";
import { useCallback, useState, useRef } from "react";
import { toast } from "sonner";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";
import { Input } from "~/components/ui/input";

// Tipe untuk props komponen
interface TiptapEditorProps {
  value: string; // Tiptap akan mengurai string JSON ini
  onChange: (jsonValue: object) => void;
  className?: string;
  placeholder?: string;
}

/**
 * Toolbar terpisah untuk editor Tiptap
 */
const TiptapToolbar = ({ editor }: { editor: Editor }) => {
  const [isLinkEditOpen, setIsLinkEditOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Fungsi untuk menangani unggah gambar
  const handleImageUpload = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("File bukan gambar.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Gambar terlalu besar. Maksimal 10MB.");
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Mengunggah gambar...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Gagal mengunggah gambar.");
      }

      const result = (await response.json()) as { url: string };
      editor.chain().focus().setImage({ src: result.url }).run();
      toast.success("Gambar berhasil diunggah.", { id: toastId });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Terjadi kesalahan.",
        { id: toastId },
      );
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset input file
      }
    }
  };

  // Callback untuk mengatur link
  const setLink = useCallback(() => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl, target: null }) // Hapus target="_blank"
        .run();
    } else {
      // Jika URL kosong, hapus link
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    setIsLinkEditOpen(false);
    setLinkUrl("");
  }, [editor, linkUrl]);

  // Saat popover link dibuka
  const handleLinkOpen = (isOpen: boolean) => {
    if (isOpen) {
      // FIX (Error 1 & 2): Explicitly cast href to string to resolve unsafe assignment.
      const existingUrl = (editor.getAttributes("link").href as string) ?? "";
      setLinkUrl(existingUrl);
    } else {
      setLinkUrl("");
    }
    setIsLinkEditOpen(isOpen);
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-b p-2">
      {/* Tombol Teks Dasar */}
      <Button
        type="button" // Mencegah submit form
        variant={editor.isActive("bold") ? "secondary" : "ghost"}
        size="icon-sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="size-4" />
      </Button>
      <Button
        type="button" // Mencegah submit form
        variant={editor.isActive("italic") ? "secondary" : "ghost"}
        size="icon-sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="size-4" />
      </Button>

      {/* Tombol Heading */}
      <Button
        type="button" // Mencegah submit form
        variant={
          editor.isActive("heading", { level: 2 }) ? "secondary" : "ghost"
        }
        size="icon-sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="size-4" />
      </Button>
      <Button
        type="button" // Mencegah submit form
        variant={
          editor.isActive("heading", { level: 3 }) ? "secondary" : "ghost"
        }
        size="icon-sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="size-4" />
      </Button>

      {/* Tombol List */}
      <Button
        type="button" // Mencegah submit form
        variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
        size="icon-sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="size-4" />
      </Button>
      <Button
        type="button" // Mencegah submit form
        variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
        size="icon-sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="size-4" />
      </Button>

      {/* Tombol Link */}
      <Popover open={isLinkEditOpen} onOpenChange={handleLinkOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button" // Mencegah submit form
            variant={editor.isActive("link") ? "secondary" : "ghost"}
            size="icon-sm"
          >
            <LinkIcon className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="flex flex-col gap-4">
            <h4 className="leading-none font-medium">Atur Tautan</h4>
            <Input
              type="url"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setLink();
                }
              }}
            />
            <div className="flex justify-end gap-2">
              {editor.isActive("link") && (
                <Button
                  type="button" // Mencegah submit form
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    editor.chain().focus().unsetLink().run();
                    setIsLinkEditOpen(false);
                  }}
                >
                  <Unlink className="mr-2 size-4" /> Hapus
                </Button>
              )}
              <Button type="button" size="sm" onClick={setLink}>
                Terapkan
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Tombol Gambar */}
      <Button
        type="button" // Mencegah submit form
        variant="ghost"
        size="icon-sm"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        {isUploading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <ImagePlus className="size-4" />
        )}
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        className="sr-only"
        accept="image/*"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.currentTarget.files?.[0];
          if (file) void handleImageUpload(file);
        }}
      />
    </div>
  );
};

/**
 * Komponen editor Tiptap utama
 */
export function TiptapEditor({
  value,
  onChange,
  className,
  placeholder = "Mulai tulis cerita Anda di sini...",
}: TiptapEditorProps) {
  const [isUploading, setIsUploading] = useState(false);

  // Fungsi untuk menangani unggah gambar
  const handleImageUpload = async (file: File): Promise<string | null> => {
    if (!file) return null;
    if (!file.type.startsWith("image/")) {
      toast.error("File bukan gambar.");
      return null;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Gambar terlalu besar. Maksimal 10MB.");
      return null;
    }

    setIsUploading(true);
    const toastId = toast.loading("Mengunggah gambar...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Gagal mengunggah gambar.");
      }

      const result = (await response.json()) as { url: string };
      toast.success("Gambar berhasil diunggah.", { id: toastId });
      return result.url;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Terjadi kesalahan.",
        { id: toastId },
      );
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  // Parsing konten awal
  let initialContent: object | string;
  try {
    // Jika value adalah string JSON yang valid, parse.
    // Ini penting jika data dari DB adalah JSON yang disimpan sebagai string.
    initialContent = JSON.parse(value) as object;
  } catch {
    // FIX (Error 7): Omit unused catch variable 'e'.
    // Jika gagal parse (mungkin string HTML atau kosong), gunakan apa adanya.
    // Tiptap bisa menangani string HTML.
    initialContent = value || "";
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        blockquote: false,
        codeBlock: false,
        code: false,
        horizontalRule: false,
        heading: {
          levels: [2, 3],
        },
        link: {
          openOnClick: false,
          autolink: true,
          HTMLAttributes: {
            target: null,
            rel: "noopener noreferrer nofollow",
          },
        },
      }),

      Image.configure({
        inline: false, // Izinkan gambar menjadi blok
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: initialContent, // Gunakan konten yang sudah diparsing
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        // Terapkan kelas 'prose' untuk styling dari @tailwindcss/typography
        // Ini memerlukan file CSS kustom (misal: /src/styles/tiptap.css)
        class: cn(
          "prose prose-sm sm:prose-base dark:prose-invert",
          "max-w-none focus:outline-none",
          "min-h-[300px] p-4",
        ),
      },
      // Logika unggah drag-and-drop
      handleDrop: (view, event, slice, moved) => {
        if (moved) return false; // Abaikan drop internal

        const { files } = event.dataTransfer ?? {};
        if (!files || files.length === 0) return false;

        // FIX (Error 4 & 5): Add a check for 'file' to ensure it's not undefined.
        const file = files[0];
        if (!file) return false;

        if (file.type.startsWith("image/")) {
          event.preventDefault(); // Tangani drop

          void (async () => {
            const url = await handleImageUpload(file);
            if (url) {
              const { schema } = view.state;
              const coords = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              });

              // FIX (Error 6): Check if coords and schema.nodes.image exist
              if (!coords || !schema.nodes.image) return;

              const node = schema.nodes.image.create({ src: url });
              const transaction = view.state.tr.insert(coords.pos, node);
              view.dispatch(transaction);
            }
          })();
          return true; // Beri tahu Tiptap bahwa kita sudah menanganinya
        }
        return false; // Bukan file gambar, biarkan Tiptap menanganinya
      },
    },
    immediatelyRender: false,
  });

  return (
    <div
      className={cn(
        "border-input relative rounded-md border bg-transparent shadow-sm",
        className,
      )}
    >
      {isUploading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-md bg-white/70 backdrop-blur-sm dark:bg-black/70">
          <Loader2 className="text-primary size-6 animate-spin" />
        </div>
      )}
      {editor && <TiptapToolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}
