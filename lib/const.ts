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

export enum ModalKeys {
  ModalId = "modal-id",
  DeleteTopic = "delete-topic",
  DeleteResource = "delete-resource",
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

function normalizeParams(
  params?: Record<string, string | number | boolean | null | undefined>,
) {
  if (!params) return [];
  return Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}:${value ?? "null"}`);
}

export const cachedQueryKeys = {
  subjectTopics: (params: Record<string, any>) => [
    "subject-topics",
    ...normalizeParams(params),
  ],
  scheduleDate: (date?: string) => ["subject-topics", date ?? null],
  filters: (params: Record<string, any>) => [
    "filters",
    ...normalizeParams(params),
  ],
  selectFilters: (name: string) => ["select", name],
  schedule: (params: Record<string, any>) => [
    "schedule",
    ...normalizeParams(params),
  ],
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
