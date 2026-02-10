"use client";

import { uploadFileAction } from "@/lib/actions/file.action";
import { IUploadedFile } from "@/lib/services/file/type";
import { useMutation } from "@tanstack/react-query";
import React, { FC } from "react";
import { toast } from "sonner";
import { FileUploaderProps } from "./hooks/useFileUpload";

export const FileUploader: FC<FileUploaderProps> = ({
  files,
  setFiles,
  folder,
  moduleName,
}) => {
  const { mutateAsync: uploadFile, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      uploadFileAction({
        body: formData,
      }),
  });

  const handleUploadFile = async (
    file: File,
  ): Promise<IUploadedFile | undefined> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("module", moduleName || "");
    formData.append("folder", folder);
    const res = await uploadFile(formData);
    console.log(res, "res");
    if (!res?.success) {
      toast.error("Yuklashda xatolik");
      return;
    }

    return res?.data;
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    console.log(selectedFiles, "selected");
    if (!selectedFiles?.length) return;
    try {
      const uploaded = await Promise.all(
        Array.from(selectedFiles).map(handleUploadFile),
      );
      setFiles((prev) => [...prev, ...uploaded?.filter((e) => !!e)]);
    } catch (err) {
      console.error(err);
    } finally {
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <input type="file" multiple onChange={handleChange} />

      {isPending && <p className="text-sm">Uploading...</p>}

      {files.length > 0 && (
        <ul className="text-sm space-y-1">
          {files.map((file) => (
            <li key={file.uuid}>
              🎵 {file.original_name} ({file.human_size})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
