"use client";
import { GoogleTagManager } from "@next/third-parties/google";

export function GTM() {
  const id = process.env.NEXT_PUBLIC_GTM_ID;
  if (!id) return null;
  return <GoogleTagManager gtmId={id} />;
}
