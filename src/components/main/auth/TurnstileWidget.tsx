"use client";

import Turnstile from "react-turnstile";

const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!;

export default function TurnstileWidget({ onVerify }: any) {
  return (
    <Turnstile
      sitekey={siteKey}
      size="normal"
      refreshExpired="auto"
      fixedSize={true}
      onVerify={(token) => {
        onVerify(token);
      }}
      onError={(err) => console.error("Turnstile error:", err)}
    />
  );
}
