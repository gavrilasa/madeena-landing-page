// src/app/(main)/primary/achievements/[id]/page.tsx

import { notFound } from "next/navigation";
import { achievementsData } from "~/data/academic/achievmentsData";
import AchievementDetail from "~/components/academic/AchievementDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return achievementsData.primary.items.map((item) => ({
    id: item.id.toString(),
  }));
}

export default async function PrimaryAchievementDetailPage({ params }: PageProps) {
  const { id } = await params;
  const achievementId = parseInt(id);

  const item = achievementsData.primary.items.find(
    (item) => item.id === achievementId
  );

  if (!item) {
    notFound();
  }

  return <AchievementDetail item={item} category="primary" />;
}