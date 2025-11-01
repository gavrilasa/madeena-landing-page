// File: src/app/api/auth/[...all]/route.ts
import { auth } from "~/lib/auth"; // Sesuaikan path jika perlu (mungkin '~/lib/auth')
import { toNextJsHandler } from "better-auth/next-js";

// Ekspor handler untuk metode GET dan POST
export const { GET, POST } = toNextJsHandler(auth);

// Pastikan path '@/lib/auth' atau '~/lib/auth' sudah benar sesuai konfigurasi alias path Anda
// di tsconfig.json
