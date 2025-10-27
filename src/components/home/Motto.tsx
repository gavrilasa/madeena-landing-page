export default function Motto() {
  return (
    <section className="relative w-full overflow-x-hidden bg-[#f4f8fc] px-6 py-24 md:px-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-20 p-4 md:gap-24 md:px-8">
        <div className="items-left flex flex-col text-left md:items-start md:text-left">
          <h2 className="mb-6 text-4xl font-bold text-[#1E88E5] md:text-5xl">
            Vision
          </h2>
          <p className="text-md max-w-3xl leading-relaxed text-gray-800 md:text-xl">
            To nurture a golden generation who learns with faith, character, and{" "}
            <br />
            excellence — becoming future leaders grounded in Islamic values.
          </p>
        </div>

        {/* Mission */}
        <div className="items-left flex flex-col text-left md:ml-80 md:items-start md:text-left">
          <h2 className="mb-6 text-4xl font-bold text-[#1E88E5] md:text-5xl">
            Mission
          </h2>
          <ol className="text-md max-w-3xl list-inside list-decimal space-y-2 text-gray-800 md:text-xl">
            <li>
              Integrate faith and knowledge to build balanced intellectual and
              spiritual growth.
            </li>
            <li>
              Cultivate Islamic character through daily practice and positive
              culture.
            </li>
            <li>Encourage creativity, confidence, and lifelong learning.</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
