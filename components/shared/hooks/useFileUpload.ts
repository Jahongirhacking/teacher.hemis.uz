import { IUploadedFile } from "@/lib/services/file/type";
import { Dispatch, SetStateAction, useState } from "react";

export interface FileUploaderProps {
  files: IUploadedFile[];
  setFiles: Dispatch<SetStateAction<IUploadedFile[]>>;
  moduleName?: "study_resources" | "tasks";
  folder: string;
}

const useFileUpload = () => {
  const [files, setFiles] = useState<FileUploaderProps["files"]>([]);

  return {
    files,
    setFiles,
  };
};

export default useFileUpload;
