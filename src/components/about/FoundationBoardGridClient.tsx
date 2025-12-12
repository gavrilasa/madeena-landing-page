// src/components/about/FoundationBoardGridClient.tsx
"use client";

import AboutQuickLinks from "./AboutQuickLinks";
import { Carousel, Card } from "~/components/ui/apple-card-carousel";
import { User } from "lucide-react";
import { type FoundationMember } from "~/types/foundation";

interface FoundationBoardGridClientProps {
  data: FoundationMember[];
}

export default function FoundationBoardGridClient({
  data,
}: FoundationBoardGridClientProps) {

  const cards = data.map((member, index) => (
    <Card
      key={member.id}
      card={{
        src:
          member.imageUrl ??
          "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000&auto=format&fit=crop",
        title: member.name,
        category: member.role,
        quote: "", // Hapus quote display di card preview jika tidak perlu detail
        id: member.id,
      }}
      index={index}
      layout={false} // Disable layout animation (modal effect)
    />
  ));

  return (
    <>
      <section className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto px-18 lg:px-8">
          <div className="w-full">
            {cards.length > 0 ? (
              <Carousel items={cards} />
            ) : (
              <div className="flex h-64 flex-col items-center justify-center rounded-3xl bg-gray-50 text-center">
                <User className="mb-4 h-12 w-12 text-gray-300" />
                <p className="text-gray-500">Belum ada data anggota yayasan.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal removed completely */}

      <AboutQuickLinks />
    </>
  );
}