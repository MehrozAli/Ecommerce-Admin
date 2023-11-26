"use client";

import { useEffect } from "react";
import { useStoreModal } from "@/hooks/useStoreModal";

export default function SetupPage() {
  const isOpen = useStoreModal(({ isOpen }) => isOpen);
  const onOpen = useStoreModal(({ onOpen }) => onOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
