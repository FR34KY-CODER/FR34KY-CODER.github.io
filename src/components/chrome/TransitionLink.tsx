"use client";

import React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { triggerRouteNavigation } from "@/lib/navigation";

interface TransitionLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    LinkProps {
  children: React.ReactNode;
  className?: string;
}

export function TransitionLink({
  href,
  children,
  onClick,
  className,
  ...rest
}: TransitionLinkProps) {
  const router = useRouter();
  const hrefString = typeof href === "string" ? href : href.pathname || "/";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (
      e.defaultPrevented ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0 ||
      rest.target === "_blank"
    ) {
      return;
    }

    if (
      hrefString.startsWith("http://") ||
      hrefString.startsWith("https://") ||
      hrefString.startsWith("mailto:")
    ) {
      return;
    }

    e.preventDefault();
    triggerRouteNavigation(hrefString, router);
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </Link>
  );
}

