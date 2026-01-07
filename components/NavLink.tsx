"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useLenis } from "@/components/SmoothScroll";

interface NavLinkPropsCompat extends Omit<LinkProps, "href" | "className"> {
  to: string;
  className?: string; // Allow string className
  activeClassName?: string;
  children?: React.ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkPropsCompat>(
  ({ to, className, activeClassName, ...props }, ref) => {
    const pathname = usePathname();
    const isActive = pathname === to;
    const lenis = useLenis();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (to.startsWith("#") && lenis) {
        e.preventDefault();
        lenis.scrollTo(to);
      }
      if (props.onClick) {
        props.onClick(e);
      }
    };

    return (
      <Link
        ref={ref}
        href={to}
        className={cn(className, isActive && activeClassName)}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
