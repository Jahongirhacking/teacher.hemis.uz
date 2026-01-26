export interface LoginPayload {
  login: string;
  password: string;
}

export interface Teacher {
  id: number;
  full_name: string;
  login: string;
  email: string;
  telephone: string;
  image: string;
  university: string;
  employee: Employee;
  language: string;
}

export interface Employee {
  id: number;
  full_name: string;
  short_name: string | null;
  first_name: string;
  second_name: string;
  third_name: string;
  birth_date: string;
  phone: string | null;
  email: string;
  passport_number: string;
  passport_pin: string;
  image: string;
  gender: string | null;
  nationality: string | null;
  active: boolean;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  message: string;
  teacher: Teacher;
}

export interface ITeacherInfo {
  email: string;
  employee: Employee;
  full_name: string;
  id: number;
  image: string;
  language: string;
  login: string;
  telephone: string;
  university: string;
}
