import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function OrnamentDivider() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(ref.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.6, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true } }
    );
  });

  return (
    <div
      ref={ref}
      style={{ background: "#F5EDE0" }}
      className="flex items-center justify-center py-5 px-6"
    >
      <svg
        viewBox="0 0 420 72"
        width="100%"
        style={{ maxWidth: "360px" }}
        fill="none"
        aria-hidden="true"
      >
        {/* Left endpoint dot + rule */}
        <circle cx="4" cy="36" r="2.5" fill="#8B3A1A" opacity="0.55" />
        <line x1="12" y1="36" x2="135" y2="36" stroke="#8B3A1A" strokeWidth="1" opacity="0.5" />

        {/* Left baroque scroll — S-curve volute */}
        <path
          d="M 135,36 C 145,36 150,24 158,27 C 165,30 163,42 171,39 C 175,38 178,36 181,36"
          stroke="#8B3A1A" strokeWidth="1.6" strokeLinecap="round" opacity="0.7"
        />
        {/* Left acanthus leaf tip */}
        <path
          d="M 142,36 C 142,30 148,26 150,30"
          stroke="#8B3A1A" strokeWidth="1" strokeLinecap="round" opacity="0.5"
        />

        {/* Center ornament — ferro di gondola inspired medallion */}
        {/* Outer diamond */}
        <path d="M 210,14 L 229,36 L 210,58 L 191,36 Z"
              stroke="#8B3A1A" strokeWidth="1.1" opacity="0.55" />
        {/* Inner diamond */}
        <path d="M 210,20 L 224,36 L 210,52 L 196,36 Z"
              stroke="#8B3A1A" strokeWidth="1.1" opacity="0.7" />
        {/* Diagonal cross inside */}
        <line x1="196" y1="36" x2="224" y2="36" stroke="#8B3A1A" strokeWidth="0.7" opacity="0.4" />
        <line x1="210" y1="22" x2="210" y2="50" stroke="#8B3A1A" strokeWidth="0.7" opacity="0.4" />
        {/* Center dot */}
        <circle cx="210" cy="36" r="3.5" fill="#8B3A1A" opacity="0.65" />
        {/* Four cardinal accent dots */}
        <circle cx="210" cy="24" r="1.5" fill="#8B3A1A" opacity="0.5" />
        <circle cx="210" cy="48" r="1.5" fill="#8B3A1A" opacity="0.5" />
        <circle cx="198" cy="36" r="1.5" fill="#8B3A1A" opacity="0.5" />
        <circle cx="222" cy="36" r="1.5" fill="#8B3A1A" opacity="0.5" />

        {/* Right baroque scroll — mirror */}
        <path
          d="M 239,36 C 242,36 245,38 249,39 C 257,42 255,30 262,27 C 270,24 275,36 285,36"
          stroke="#8B3A1A" strokeWidth="1.6" strokeLinecap="round" opacity="0.7"
        />
        {/* Right acanthus leaf tip */}
        <path
          d="M 278,36 C 278,30 272,26 270,30"
          stroke="#8B3A1A" strokeWidth="1" strokeLinecap="round" opacity="0.5"
        />

        {/* Right rule + endpoint dot */}
        <line x1="285" y1="36" x2="408" y2="36" stroke="#8B3A1A" strokeWidth="1" opacity="0.5" />
        <circle cx="416" cy="36" r="2.5" fill="#8B3A1A" opacity="0.55" />
      </svg>
    </div>
  );
}
