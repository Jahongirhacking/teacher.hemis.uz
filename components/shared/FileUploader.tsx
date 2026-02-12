/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { uploadFileAction } from "@/lib/actions/file.action";
import {
  clientFileSchema,
  FileStatus,
  IClientFile,
  IUploadedFile,
} from "@/lib/schemas/file.schema";
import { UploadFolderName, UploadModuleName } from "@/lib/services/file/type";
import { cn } from "@/lib/utils";
import { getFileExtensionName, getFileSize } from "@/lib/utils/file.util";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircleIcon, XIcon } from "lucide-react";
import React, { ReactNode, useRef } from "react";
import { toast } from "sonner";
import { ZodType } from "zod";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Flex from "./Flex";

export interface FileUploaderProps<T extends IClientFile> {
  files: T[];
  transformerSchema?: ZodType<T & any, IUploadedFile>;
  setFiles: (arg: T[]) => void;
  moduleName?: UploadModuleName;
  folder: UploadFolderName;
  renderFiles?: (args: {
    files: T[];
    handleDelete?: (id: T) => void;
  }) => ReactNode;
  renderButton?: (args: {
    onClickUpload: (e?: Event) => void;
    isPending: boolean;
  }) => ReactNode;
  renderLoader?: () => ReactNode;
}

export const FileUploader = <T extends IClientFile>({
  files,
  setFiles,
  folder,
  moduleName,
  renderFiles,
  renderButton,
  renderLoader,
  transformerSchema = clientFileSchema,
}: FileUploaderProps<T>) => {
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
      setFiles([
        ...(files || []),
        ...(uploaded || [])
          ?.filter((file) => !!file)
          ?.map((file) =>
            transformerSchema
              ? transformerSchema.parse(file)
              : ({ ...file } as any),
          ),
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      e.target.value = "";
    }
  };

  const handleDelete = (file: IClientFile) => {
    if (file?.status === FileStatus.New) {
      setFiles(files?.filter((f) => f?.url !== file?.url));
    } else {
      console.log("This file is already submitted", file);
    }
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
            {files.map((file: T, idx) => (
              <li key={file?.url || idx}>
                <Flex
                  align="center"
                  justify="between"
                  gap={3}
                  className={cn(
                    "w-full bg-[#0066ff3b] py-[10px] px-3 rounded-md",
                    file?.status === FileStatus.New &&
                      "bg-[var(--card-header)]",
                  )}
                >
                  <Flex
                    gap={2}
                    align="center"
                    justify="between"
                    className="flex-wrap w-full"
                  >
                    <span className="line-clamp-1 max-w-none [@media(min-width:400px)]:max-w-[calc(100%-100px)]">{`${file?.name}`}</span>
                    <Badge
                      variant={"secondary"}
                    >{`${getFileExtensionName(file?.name)?.toUpperCase()} (${getFileSize(file?.size)})`}</Badge>
                  </Flex>
                  <Button
                    type="button"
                    onClick={(e) => {
                      e?.preventDefault();
                      handleDelete(file);
                    }}
                    variant={"outline"}
                    className="!p-1 h-7 w-7 bg-transparent border-none shadow-none"
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
