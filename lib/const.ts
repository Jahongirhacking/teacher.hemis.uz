/* eslint-disable @typescript-eslint/no-explicit-any */
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

function normalizeParams(params?: object) {
  if (!params) return {};
  return Object.keys(params)
    .sort()
    .reduce(
      (acc, key) => {
        acc[key] = params[key] ?? null;
        return acc;
      },
      {} as Record<string, any>,
    );
}

export const cachedQueryKeys = {
  subjectTopics: (semester?: string, subject_id?: string) => [
    "subject-topics",
    semester ?? null,
    subject_id ?? null,
  ],
  scheduleDate: (date?: string) => ["subject-topics", date ?? null],
  filters: (params: object) => ["filters", normalizeParams(params)],
};

export const DEFAULT_PAGINATION = {
  page: 1,
  size: 20,
};

export enum TIME_FORMAT {
  Server = "YYYY-MM-DD",
  ServerWithTime = "YYYY-MM-DD HH:mm:ss",
  Client = "DD.MM.YYYY",
  ClientWithTime = "DD.MM.YYYY HH:mm:ss",
}
