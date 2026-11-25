"use client";

import React from "react";
import Link, { LinkProps } from "next/link";
import { scrollToSectionId } from "@/lib/navigation";

interface TransitionLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    LinkProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Standard Next.js Link wrapper with smooth scroll for in-page anchors
 * and instant native App Router prefetching for sub-routes.
 */
export function TransitionLink({
  href,
  children,
  onClick,
  className,
  ...rest
}: TransitionLinkProps) {
  const hrefString = typeof href === "string" ? href : href.pathname || "/";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    // In-page hash scroll handling
    if (hrefString.startsWith("#")) {
      e.preventDefault();
      scrollToSectionId(hrefString.slice(1));
      return;
    }

    if (
      hrefString.startsWith("/#") &&
      typeof window !== "undefined" &&
      window.location.pathname === "/"
    ) {
      e.preventDefault();
      scrollToSectionId(hrefString.slice(2));
      return;
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      {...rest}
    >
      {children}
    </Link>
  );
}
