"use client";

import Image from "next/image";
import { X } from "lucide-react";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";

type FileUploadProps = {
  endpoint: "serverImage" | "messageFile";
  value: string;
  onChange: (url?: string) => void;
};

const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
  const fileType = value.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          src={value}
          alt="Upload"
          className="rounded-full"
          sizes="auto"
        />
        <button
          type="button"
          onClick={() => onChange("")}
          className="
            absolute 
            right-0
            top-0 
            rounded-full
            bg-rose-500
            p-1
            text-white
            shadow-sm
          "
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => onChange(res?.[0].url)}
      onUploadError={(error: Error) => console.log(error)}
    />
  );
};

export default FileUpload;
