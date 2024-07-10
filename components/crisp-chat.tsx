"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("2cc97a21-ccd7-4627-9f4b-3eab25054a98");
  }, []);

  return null;
};