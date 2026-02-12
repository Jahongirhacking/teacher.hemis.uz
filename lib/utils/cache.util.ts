export const joinCacheTags = (cacheTags: (string | number | undefined)[]) =>
  cacheTags?.filter((e) => !!e)?.join("-");

export enum CacheTagName {
  TeacherResources = "teacher-resources",
  SubjectId = "subject_id",
  ResourceId = "resource_id",
}
