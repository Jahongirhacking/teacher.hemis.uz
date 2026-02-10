export interface IBaseDataRes<T> {
  success: true;
  data?: T;
  message?: "Login yoki parol noto'g'ri";
  errors?: Record<string, string[]>;
}

export interface IBaseDataWithMeta {
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface IServerSideOptions {
  server?: boolean;
  isPrivate?: boolean;
  fromTeacherPath?: boolean;
}

export interface IPaginationParams {
  page: number;
  per_page: number;
  search?: string;
}

export interface IParamsSchema<T> {
  params: T;
}

export interface IBodySchema<T> {
  body: T;
}

export interface IBodySchema<T> {
  body: T;
}

export interface IFileProps {
  name: string;
  path: string;
  size: string;
  type: string;
  order: string;
  base_url: string;
}
