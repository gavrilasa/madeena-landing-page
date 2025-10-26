export interface NewsItem {
  id: number;
  imageUrl: string;
  altText: string;
  title: string;
  description: string;
  linkUrl: string;
}

export const newsItemsData: NewsItem[] = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=3556&auto=format&fit=crop",
    altText: "Classroom whiteboard with drawings",
    title: "A Week Recap from October",
    description: "Growing golden generation with islamic character",
    linkUrl: "/berita/rekap-oktober",
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=3387&auto=format&fit=crop",
    altText: "Students participating in an activity",
    title: "Special Event Highlights",
    description: "Celebrating achievements and community spirit.",
    linkUrl: "/berita/special-event",
  },
  {
    id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2333&auto=format&fit=crop",
    altText: "School building exterior",
    title: "Upcoming Enrollment Dates",
    description: "Prepare for the next academic year registration.",
    linkUrl: "/pendaftaran/info",
  },
];
