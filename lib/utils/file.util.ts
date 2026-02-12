export function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result.split(",")[1]); // remove "data:image/...;base64,"
      } else {
        reject(new Error("Unexpected result type"));
      }
    };

    reader.onerror = reject;
  });
}

export type IFileExtensionName =
  | "doc"
  | "docx"
  | "ppt"
  | "pptx"
  | "xls"
  | "xlsx"
  | "pdf"
  | "jpg"
  | "jpeg"
  | "png"
  | "txt";

export const getFileSize = (sizeInBytes: number) => {
  const sizeNames = ["B", "KB", "MB", "GB"];
  let count = 0;
  while (sizeInBytes >= 1024) {
    sizeInBytes /= 1024;
    count += 1;
  }
  return `${Math.ceil(sizeInBytes)} ${sizeNames[Math.min(count, sizeNames.length - 1)]}`;
};

export const getFileExtensionName = (name: string): IFileExtensionName => {
  const arr = name?.split?.(".");
  return (arr?.[arr.length - 1] as IFileExtensionName) || "";
};
