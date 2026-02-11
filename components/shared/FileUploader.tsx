"use client";

import { uploadFileAction } from "@/lib/actions/file.action";
import { IUploadedFile } from "@/lib/schemas/file.schema";
import { UploadFolderName, UploadModuleName } from "@/lib/services/file/type";
import { truncateString } from "@/lib/utils/string.util";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircleIcon, XIcon } from "lucide-react";
import React, { Dispatch, FC, ReactNode, SetStateAction, useRef } from "react";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Flex from "./Flex";

export interface FileUploaderProps {
  files: IUploadedFile[];
  setFiles: Dispatch<SetStateAction<IUploadedFile[]>>;
  moduleName?: UploadModuleName;
  folder: UploadFolderName;
  renderFiles?: (args: {
    files: IUploadedFile[];
    handleDelete?: (id: IUploadedFile["id"]) => void;
  }) => ReactNode;
  renderButton?: (args: {
    onClickUpload: (e?: Event) => void;
    isPending: boolean;
  }) => ReactNode;
  renderLoader?: () => ReactNode;
}

export const FileUploader: FC<FileUploaderProps> = ({
  files,
  setFiles,
  folder,
  moduleName,
  renderFiles,
  renderButton,
  renderLoader,
}) => {
  const uploadRef = useRef<HTMLInputElement | null>(null);
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
    if (!res?.success) {
      toast.error("Yuklashda xatolik");
      return;
    }
    return res?.data;
  };

  const handleClickUpload = () => {
    uploadRef.current?.click?.();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles?.length) return;
    try {
      const uploaded = await Promise.all(
        Array.from(selectedFiles).map(handleUploadFile),
      );
      setFiles([...(files || []), ...uploaded?.filter((e) => !!e)]);
    } catch (err) {
      console.error(err);
    } finally {
      e.target.value = "";
    }
  };

  const handleDelete = (id: IUploadedFile["id"]) => {
    setFiles(files?.filter((f) => f?.id !== id));
  };

  return (
    <Flex vertical gap={4} className="w-full">
      <input
        ref={uploadRef}
        type="file"
        multiple
        onChange={handleChange}
        className="hidden"
      />

      {renderButton ? (
        renderButton?.({ onClickUpload: handleClickUpload, isPending })
      ) : (
        <Button
          type="button"
          onClick={handleClickUpload}
          className="w-full px-4 py-2 rounded-md cursor-pointer"
          disabled={isPending}
        >
          {isPending ? (
            <span className="flex gap-2 items-center">
              <LoaderCircleIcon className="animate-spin" size={14} />{" "}
              Yuklanmoqda...
            </span>
          ) : (
            "Fayl yuklash"
          )}
        </Button>
      )}

      {files.length > 0 &&
        (renderFiles ? (
          renderFiles?.({ files, handleDelete })
        ) : (
          <ul className="text-[14px] space-y-3 w-full">
            {files.map((file: IUploadedFile) => (
              <li key={file?.uuid || file?.id}>
                <Flex
                  align="center"
                  justify="between"
                  gap={3}
                  className="w-full bg-[var(--card-header)] py-[10px] px-3 rounded-md"
                >
                  <Flex gap={2} align="center" className="flex-wrap">
                    <span>{`${truncateString(file?.original_name, 30)}`}</span>
                    <Badge
                      variant={"secondary"}
                    >{`${file?.extension?.toUpperCase()} (${file?.human_size})`}</Badge>
                  </Flex>
                  <Button
                    onClick={() => handleDelete(file?.id)}
                    variant={"ghost"}
                    className="!p-1 h-7 w-7 bg-transparent"
                  >
                    <XIcon className="!w-5 !h-5" />
                  </Button>
                </Flex>
              </li>
            ))}
          </ul>
        ))}

      {isPending && renderLoader && renderLoader?.()}
    </Flex>
  );
};
