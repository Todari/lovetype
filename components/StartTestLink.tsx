"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

interface StartTestLinkProps {
  className?: string;
  children: React.ReactNode;
}

export default function StartTestLink({ className, children }: StartTestLinkProps) {
  return (
    <Link
      href="/test"
      className={className}
      onClick={() => trackEvent("start_test", { source: "direct" })}
    >
      {children}
    </Link>
  );
}
