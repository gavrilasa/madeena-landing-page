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

      <div className="relative flex h-[40vh] w-full items-center justify-center overflow-hidden text-white md:h-[40vh]">
        <div className="text-center">
          <div className="relative inline-block">
            <h1 className="font-chalk relative mb-4 text-4xl font-bold text-white md:text-6xl lg:text-7xl">
              <span className="relative inline-block">
                {title}
                <div className="absolute right-0 -bottom-2 left-0 h-1 -rotate-1 transform bg-yellow-300 opacity-70"></div>
              </span>
            </h1>
            <div className="absolute -top-6 -right-8 rotate-12 transform text-3xl text-yellow-300">
              ★
            </div>
            <div className="absolute -bottom-4 -left-6 text-2xl text-[#FE7D01]">
              ♥
            </div>
          </div>
          <p className="font-handwriting text-md mt-6 text-white/90 md:text-xl">
            {subtitle}
          </p>
        </div>
      </div>
    </>
  );
}
