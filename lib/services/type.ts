export interface IBaseDataRes<T> {
  success: true;
  data?: T;
  message?: "Login yoki parol noto'g'ri";
  errors?: Record<string, string[]>;
}

export interface IServerSideOptions {
  server?: boolean;
  isPrivate?: boolean;
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
