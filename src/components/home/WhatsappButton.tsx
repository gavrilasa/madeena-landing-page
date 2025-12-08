import Link from "next/link";
import Image from "next/image";

export default function WhatsAppButton() {
  const phoneNumber = "6282119222822";
  const message =
    "Halo, saya tertarik untuk mengetahui informasi lebih lanjut mengenai Sekolah Al Madeena.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed right-6 bottom-6 z-50 flex h-16 min-w-16 flex-row-reverse items-center justify-between rounded-full bg-white p-2 shadow-lg transition-all duration-300 hover:gap-4 hover:pr-6 hover:shadow-xl"
      aria-label="Hubungi kami via WhatsApp"
    >
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <Image
          src="https://res.cloudinary.com/dah2v3xbg/image/upload/v1765193910/WhatsApp_uktdmq.webp"
          alt="WhatsApp Contact"
          fill
          className="object-contain"
          sizes="48px"
        />
      </div>

      <span className="max-w-0 overflow-hidden text-lg font-semibold whitespace-nowrap text-green-600 opacity-0 transition-all duration-300 group-hover:max-w-[150px] group-hover:pl-4 group-hover:opacity-100">
        Hubungi Kami
      </span>
    </Link>
  );
}
