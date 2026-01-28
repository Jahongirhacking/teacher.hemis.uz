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
