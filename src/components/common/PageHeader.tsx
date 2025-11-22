// src/components/common/PageHeader.tsx

import Image from "next/image";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export default function PageHeader({
  title,
  subtitle,
  imageUrl,
}: PageHeaderProps) {
  return (
    <>
      <div className="absolute inset-0 flex h-[40vh] w-full items-center justify-center overflow-hidden text-white md:h-[50vh]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative flex h-[40vh] w-full items-center justify-center overflow-hidden px-4 text-white md:h-[40vh]">
        <div className="text-center">
          <div className="relative inline-block max-w-full">
            {/* Updated title sizing for better mobile responsiveness */}
            <h1 className="font-chalk relative mb-4 text-3xl leading-tight font-bold wrap-break-word text-white sm:text-4xl md:text-6xl lg:text-7xl">
              <span className="relative inline-block">
                {title}
                <div className="absolute right-0 -bottom-2 left-0 h-1 -rotate-1 transform bg-yellow-300 opacity-70"></div>
              </span>
            </h1>
            {/* Adjusted decorative elements positioning */}
            <div className="absolute -top-4 -right-4 rotate-12 transform text-xl text-yellow-300 sm:-top-6 sm:-right-8 sm:text-3xl">
              ★
            </div>
            <div className="absolute -bottom-2 -left-3 text-lg text-[#FE7D01] sm:-bottom-4 sm:-left-6 sm:text-2xl">
              ♥
            </div>
          </div>
          {/* Updated subtitle sizing */}
          <p className="font-handwriting mx-auto mt-4 max-w-prose text-sm text-white/90 sm:mt-6 sm:text-base md:text-xl">
            {subtitle}
          </p>
        </div>
      </div>
    </>
  );
}
