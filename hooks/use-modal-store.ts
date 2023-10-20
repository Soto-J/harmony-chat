import { Server } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer";

type ModalData = {
  server?: Server;
};

type ModalStore = {
  modalType: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  modalType: null,
  data: {},
  isOpen: false,
  onOpen: (modalType, data = {}) => set({ isOpen: true, modalType, data }),
  onClose: () => set({ isOpen: false, modalType: null }),
}));
