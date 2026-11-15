import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f4f1ea] px-6 text-[#0f1217]">
      <div className="text-center space-y-4">
        <span className="font-mono text-xs uppercase tracking-widest text-[#ea1d0f]">
          Error 404 · Sector Missing
        </span>
        <h1 className="text-4xl font-black uppercase tracking-tight text-[#0f1217]">
          Page Not Found
        </h1>
        <p className="max-w-md text-sm text-[#4a443c]">
          The coordinates you entered do not exist on this sector. Return to the home sector.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#0f1217]/20 bg-[#0f1217] px-5 py-2 font-mono text-xs uppercase tracking-wider text-[#f4f1ea] hover:bg-[#ea1d0f] transition"
          >
            ← Return to Hub
          </Link>
        </div>
      </div>
    </div>
  );
}

