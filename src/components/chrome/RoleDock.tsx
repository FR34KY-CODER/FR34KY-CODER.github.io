"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRole } from "@/context/RoleContext";
import { CORE_ROLES, RoleId } from "@/data/roles";

export function RoleDock() {
  const pathname = usePathname();
  const { activeRole, setActiveRole } = useRole();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;
    const check = () => {
      const hero = document.getElementById("two-sides");
      const street = document.getElementById("the-street");
      const factory = document.getElementById("the-factory");
      const finale = document.getElementById("both-sides");
      const vh = window.innerHeight;
      const inView = (el: HTMLElement | null) => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top < vh * 0.7 && r.bottom > vh * 0.25;
      };
      setHidden(
        inView(hero) || inView(street) || inView(factory) || inView(finale)
      );
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [pathname]);

  if (pathname !== "/") return null;

  const items: { id: RoleId; code: string; label: string; color: string }[] = [
    { id: "all", code: "00", label: "ALL 4", color: "#f4f1ea" },
    ...CORE_ROLES.map((r) => ({
      id: r.id,
      code: r.code,
      label: r.shortLabel.toUpperCase(),
      color: r.accentNight,
    })),
  ];

  return (
    <aside
      aria-label="Global 4-Role Switcher"
      className={`fixed bottom-4 left-4 sm:bottom-5 sm:left-6 z-40 hidden md:inline-flex items-center gap-1 rounded-full border border-[#f4f1ea]/16 bg-[#0f1217]/90 p-1.5 text-[#f4f1ea] shadow-2xl backdrop-blur-md transition-all duration-300 ${hidden ? "role-dock-hidden" : ""}`}
    >
      <span className="px-2.5 font-mono text-[12px] tracking-[0.18em] text-[#f4f1ea]/75 uppercase">
        Lens
      </span>
      {items.map((item) => {
        const active = activeRole === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveRole(item.id)}
            title={`Switch portfolio lens to ${item.label}`}
            className="group inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[12px] tracking-[0.1em] uppercase transition-all duration-200 cursor-pointer"
            style={{
              backgroundColor: active ? item.color : "transparent",
              color: active ? "#0f1217" : "rgba(244,241,234,0.78)",
            }}
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full transition-transform group-hover:scale-125"
              style={{
                backgroundColor: active ? "#0f1217" : item.color,
              }}
            />
            <span className="font-bold">{item.label}</span>
          </button>
        );
      })}
    </aside>
  );
}
