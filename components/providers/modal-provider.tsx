"use client";

import { useEffect, useState } from "react";

import CreateServerModal from "@/components/modals/create-server-modal";

const ModalProvider = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }
  
  return (
    <>
      <CreateServerModal />
    </>
  );
};

export default ModalProvider;
