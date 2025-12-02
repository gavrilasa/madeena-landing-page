export type Gender = "MALE" | "FEMALE";

export interface Staff {
  id: string;
  name: string;
  nip: string;
  gender: Gender;
  role: string;
  department: string;
  quote: string | null;
  email: string | null;
  instagram: string | null;
  imageUrl: string | null;
  bio: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStaffBody {
  name: string;
  nip: string;
  gender: Gender;
  role: string;
  department: string;
  quote?: string;
  email?: string;
  instagram?: string;
  imageUrl?: string;
  bio?: string;
  isActive?: boolean;
}

export interface UpdateStaffBody {
  name?: string;
  nip?: string;
  gender?: Gender;
  role?: string;
  department?: string;
  quote?: string;
  email?: string;
  instagram?: string;
  imageUrl?: string;
  bio?: string;
  isActive?: boolean;
  order?: number;
}

export interface ReorderStaffItem {
  id: string;
  order: number;
}

export interface ReorderStaffBody {
  items: ReorderStaffItem[];
}
