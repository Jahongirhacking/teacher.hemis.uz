export interface IUploadedFile {
  id: number;
  uuid: string;
  url: string;
  original_name: string;
  mime_type: string;
  extension: string;
  size: number;
  human_size: string;
  type: string;
  type_name: string;
  created_at: string;
}
