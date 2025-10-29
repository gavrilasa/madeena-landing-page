// File: src/lib/auth-client.ts
"use client"; // File ini kemungkinan akan digunakan di komponen client

import { createAuthClient } from "better-auth/react"; // Atau /client jika tidak spesifik React

export const authClient = createAuthClient({});

// Ekspor metode yang mungkin dibutuhkan di client, contoh:
export const { signIn, signOut, useSession /* nama bisa berbeda */ } =
  authClient;
