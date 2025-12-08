import { z } from "zod";

export type CareerStatus = "DRAFT" | "PUBLISHED";

export interface Career {
  id: string;
  title: string;
  type: string;
  department: string;
  location: string;
  description: string;
  requirements: string[];
  status: CareerStatus;
  createdAt: Date;
  updatedAt: Date;
}

export const CreateCareerSchema = z.object({
  title: z.string().min(3, { message: "Judul pekerjaan minimal 3 karakter" }),
  type: z.string().min(1, { message: "Tipe pekerjaan harus diisi" }),
  department: z.string().min(1, { message: "Departemen harus diisi" }),
  location: z.string().min(1, { message: "Lokasi harus diisi" }),
  description: z.string().min(10, { message: "Deskripsi minimal 10 karakter" }),
  requirements: z.array(z.string().min(1, "Poin tidak boleh kosong")),

  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export const UpdateCareerSchema = CreateCareerSchema.partial();

export type CreateCareerInput = z.infer<typeof CreateCareerSchema>;
export type UpdateCareerInput = z.infer<typeof UpdateCareerSchema>;
