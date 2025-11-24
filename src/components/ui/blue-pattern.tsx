"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BluePatternProps {
  className?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
}

export function BluePattern({ className = "", containerRef }: BluePatternProps) {
  const patternRef = useRef<SVGPathElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const path = patternRef.current;
      const triggerElement = containerRef?.current || wrapperRef.current;

      if (path && triggerElement) {
        gsap.fromTo(
          path,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: triggerElement,
              start: "top 75%",
              end: "top 25%",
              scrub: 1.5,
            },
          }
        );
      }
    },
    { scope: wrapperRef, dependencies: [containerRef] }
  );

  return (
    <div ref={wrapperRef} className={`pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 198 209"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          ref={patternRef}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M120.997 47.7618H84.3792C79.1036 47.7618 74.8269 43.4851 74.8269 38.2095V10.3484C74.8269 4.63314 70.1937 0 64.4785 0H58.9063C53.191 0 48.5579 4.63314 48.5579 10.3484V38.2095C48.5579 43.4851 44.2811 47.7618 39.0055 47.7618H9.55237C4.27674 47.7618 0 52.0386 0 57.3142V65.2745C0 70.5501 4.27674 74.8269 9.55237 74.8269H38.2095C43.9247 74.8269 48.5579 79.46 48.5579 85.1753V122.589C48.5579 128.304 43.9247 132.937 38.2095 132.937H9.55237C4.27674 132.937 0 137.214 0 142.489V149.654C0 154.929 4.27674 159.206 9.55237 159.206H38.2095C43.9247 159.206 48.5579 163.839 48.5579 169.555V199.008C48.5579 204.283 52.8346 208.56 58.1102 208.56H65.2745C70.5501 208.56 74.8269 204.283 74.8269 199.008V168.758C74.8269 163.483 79.1036 159.206 84.3792 159.206H120.997C126.272 159.206 122.589 163.483 122.589 168.758V199.008C122.589 204.283 126.865 208.56 132.141 208.56H139.305C144.581 208.56 148.858 204.283 148.858 199.008V169.555C148.858 163.839 153.491 159.206 159.206 159.206H187.863C193.139 159.206 197.416 154.929 197.416 149.654V142.489C197.416 137.214 193.139 132.937 187.863 132.937H159.206C153.491 132.937 148.858 128.304 148.858 122.589V85.1753C148.858 79.46 153.491 74.8269 159.206 74.8269H187.863C193.139 74.8269 197.416 70.5501 197.416 65.2745V57.3142C197.416 52.0386 193.139 47.7618 187.863 47.7618H158.41C153.134 47.7618 148.858 43.4851 148.858 38.2095V10.3484C148.858 4.63314 144.225 0 138.509 0H132.937C127.222 0 122.589 4.63314 122.589 10.3484V38.2095C122.589 43.4851 126.272 47.7618 120.997 47.7618ZM122.589 85.1753C122.589 79.46 117.956 74.8269 112.24 74.8269H82.7872C78.3908 74.8269 74.8269 78.3908 74.8269 82.7872V85.1753V122.589V124.977C74.8269 129.373 78.3908 132.937 82.7872 132.937H112.24C117.956 132.937 122.589 128.304 122.589 122.589V85.1753Z"
          fill="#0193DC"
        />
      </svg>
    </div>
  );
}