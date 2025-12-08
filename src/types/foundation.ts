// src/types/foundation.ts

export type Gender = "MALE" | "FEMALE";

export interface FoundationMember {
  id: string;
  name: string;
  gender: Gender;
  role: string;
  quote: string | null;
  email: string | null;
  instagram: string | null;
  imageUrl: string | null;
  bio: string | null;
  order: number;
  isActive: boolean;
  // PERBAIKAN: Menggunakan Date, bukan string
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFoundationBody {
  name: string;
  gender: Gender;
  role: string;
  quote?: string;
  email?: string;
  instagram?: string;
  imageUrl?: string;
  bio?: string;
  isActive?: boolean;
}

export interface UpdateFoundationBody {
  name?: string;
  gender?: Gender;
  role?: string;
  quote?: string;
  email?: string;
  instagram?: string;
  imageUrl?: string;
  bio?: string;
  isActive?: boolean;
  order?: number;
}