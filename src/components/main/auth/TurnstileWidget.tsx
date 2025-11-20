"use client";

import Turnstile from "react-turnstile";
import React from "react";

const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!;
console.log(siteKey); // برای بررسی مقدار متغیر

export default function TurnstileWidget({ onVerify }: any) {
  return (
    <Turnstile
      sitekey={siteKey}
      execution="execute"
      appearance="execute"
      refreshExpired="auto"
      onVerify={(token, bound) => {
        onVerify(token);
      }}
      onLoad={(widgetId, bound) => {
        bound.execute();
      }}
      onError={(err) => console.error("Turnstile error:", err)}
    />
  );
}
