// src/lib/schemas/careerSchema.ts

import { z } from "zod";

export const careerFormSchema = z.object({
  title: z.string().min(3, { message: "Judul minimal 3 karakter" }),
  type: z.string().min(1, { message: "Tipe harus diisi" }),
  department: z.string().min(1, { message: "Departemen harus diisi" }),
  location: z.string().min(1, { message: "Lokasi harus diisi" }),
  description: z.string().min(10, { message: "Deskripsi minimal 10 karakter" }),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  requirements: z
    .array(
      z.object({
        value: z.string().min(1, "Poin tidak boleh kosong"),
      }),
    )
    .min(1, "Minimal harus ada satu persyaratan"),
});

export type CareerFormValues = z.infer<typeof careerFormSchema>;
