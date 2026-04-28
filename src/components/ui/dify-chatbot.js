"use client";
import { useEffect } from "react";

export default function DifyChatbot() {
  useEffect(() => {
    if (document.getElementById("tsNuWPV7s9OhR7m8")) return;

    window.difyChatbotConfig = {
      token: "tsNuWPV7s9OhR7m8",
      dynamicScript: true,
      inputs: {},
      systemVariables: {},
      userVariables: {},
    };

    const script = document.createElement("script");
    script.src = "https://udify.app/embed.min.js";
    script.id = "tsNuWPV7s9OhR7m8";
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return null;
}
