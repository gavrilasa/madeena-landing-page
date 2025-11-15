// src/components/common/InstagramFeed.tsx

export default function InstagramFeed() {
  return (
    <iframe
      src="https://www.instagram.com/almadeena.islamic.school/embed"
      width="100%"
      height="300"
      allow="encrypted-media"
      className="h-[300px] w-full rounded-xl md:h-[340px] lg:h-[360px]"
      loading="lazy"
    ></iframe>
  );
}
