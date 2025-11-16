"use client";

import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import ReCAPTCHA from "react-google-recaptcha";

interface RecaptchaPortalProps {
  captchaRef: React.RefObject<ReCAPTCHA>;
}

export const RecaptchaPortal: React.FC<RecaptchaPortalProps> = ({
  captchaRef,
}) => {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let div = document.getElementById("recaptcha-portal");
    if (!div) {
      div = document.createElement("div");
      div.id = "recaptcha-portal";
      div.className = "recaptcha-fixed-portal";
      document.body.appendChild(div);
    }

    setPortalElement(div);

    return () => {
      if (document.body.contains(div)) {
        document.body.removeChild(div);
      }
    };
  }, []);

  const RecaptchaComponent = (
    <ReCAPTCHA
      size="invisible"
      badge="bottomleft"
      ref={captchaRef}
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      theme="light"
    />
  );

  return portalElement
    ? ReactDOM.createPortal(RecaptchaComponent, portalElement)
    : null;
};
