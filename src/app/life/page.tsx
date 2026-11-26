"use client";

import Image from "next/image";

import { useCatalog } from "@/context/Catalog";

const chapters = [
  {
    name: "At Celebal Technologies",

    files: [
      "/images/Celebal and Team Outings/WhatsApp Image 2026-11-27 at 3.57.31 AM.jpeg",

      "/images/Celebal and Team Outings/WhatsApp Image 2026-11-27 at 4.05.07 AM.jpeg",
    ],
  },

  {
    name: "On two wheels",

    files: [
      "/images/Bikes/WhatsApp Image 2026-11-27 at 3.50.21 AM.1243jpeg.jpeg",

      "/images/Bikes/WhatsApp Image 2026-11-27 at 3.50.21 AM.jpeg",

      "/images/Bikes/WhatsApp Image 2026-11-27 at 3.50.22 AewrewM.jpeg",

      "/images/Bikes/WhatsApp Image 2026-11-27 at 3.50.23 AM.jpeg",

      "/images/Bikes/WhatsApp Image 2026-11-27 at 3.50.23 AM1.jpeg",
    ],
  },

  {
    name: "College",

    files: ["/images/College/WhatsApp Image 2026-11-27 at 3.58.53 AM.jpeg"],
  },

  {
    name: "Convocation",

    files: [
      "/images/Convocation/234234.jpeg",

      "/images/Convocation/ew.mp4",

      "/images/Convocation/WhatsApp Image 2026-11-27 at 3.54.40 AM1231.jpeg",

      "/images/Convocation/WhatsApp Image 2026-11-27 at 3.54.41 AM.4324jpeg.jpeg",

      "/images/Convocation/WhatsApp Video 2026-11-27 at 3.54.40 AM.mp4",
    ],
  },
];

export default function Life() {
  const { city } = useCatalog();

  return (
    <article className="life-album">
      <header>
        <p className="culture-kicker">Personal archive</p>
        <h1>Life in {city}</h1>
        <nav aria-label="Album chapters">
          {chapters.map((c, i) => (
            <a key={c.name} href={"#album-" + i}>
              {c.name}
            </a>
          ))}
        </nav>
      </header>

      {chapters.map((c, i) => (
        <section id={"album-" + i} key={c.name}>
          <h2>{c.name}</h2>
          <div>
            {c.files.map((file, j) =>
              file.endsWith(".mp4") ? (
                <video
                  key={file}
                  aria-label={c.name + " video " + (j + 1)}
                  controls
                  playsInline
                  preload="none"
                  src={file}
                />
              ) : (
                <a key={file} href={file} target="_blank" rel="noreferrer">
                  <Image
                    width={720}
                    height={720}
                    src={file}
                    alt={c.name + " · photo " + (j + 1)}
                  />
                </a>
              ),
            )}
          </div>
        </section>
      ))}
    </article>
  );
}
