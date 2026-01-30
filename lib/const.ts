export enum SearchParams {
  ActiveTab = "active-tab",
  PaginationPage = "page",
  PaginationSize = "size",
  Date = "date",
  Drawer = "active-drawer",
  Modal = "active-modal",
}

export enum SearchParamsKeys {
  SubjectId = "subject-id",
  SubjectInfo = "subject-info",
}

export enum FilterParams {
  Activity = "activity-type",
}

export enum LocalStorageKeys {
  Theme = "theme",
}

export enum CookieItems {
  AccessToken = "access_token",
  RefreshToken = "teacher-refresh-token",
  ServerUrl = "server_url",
}

export const cachedQueryKeys = {
  subjectTopics: (semester?: string, subject_id?: string) => [
    "subject-topics",
    semester ?? null,
    subject_id ?? null,
  ],
};

export const DEFAULT_PAGINATION = {
  page: 1,
  size: 10,
};
