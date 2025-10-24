"use client";

export default function Motto() {
  return (
    <section className="relative w-full bg-[#f4f8fc] py-24 px-6 md:px-20 overflow-x-hidden">
      <div className="max-w-6xl mx-auto flex flex-col gap-20 md:gap-24 p-4 md:px-8">
        {/* Vision */}
        <div className="flex flex-col items-left md:items-start text-left md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E88E5] mb-6">
            Vision
          </h2>
          <p className="text-md md:text-xl text-gray-800 leading-relaxed max-w-3xl">
            To nurture a golden generation who learns with faith, character, and <br />
            excellence — becoming future leaders grounded in Islamic values.
          </p>
        </div>

        {/* Mission */}
        <div className="flex flex-col items-left md:items-start text-left md:text-left md:ml-80">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E88E5] mb-6">
            Mission
          </h2>
          <ol className="list-decimal list-inside text-md md:text-xl text-gray-800 space-y-2 max-w-3xl">
            <li>
              Integrate faith and knowledge to build balanced intellectual and
              spiritual growth.
            </li>
            <li>
              Cultivate Islamic character through daily practice and positive
              culture.
            </li>
            <li>
              Encourage creativity, confidence, and lifelong learning.
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
