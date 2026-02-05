import { IFileProps } from "../type";

export interface IEducationType {
  code: string;
  name: string;
}

export interface IDepartment {
  id: number;
  name: string;
}

export interface ITraining {
  training_type: string;
  training_type_name: string;
  academic_load: number;
  topic_load: number;
  topic_count?: number;
  is_complete: boolean;
}

export interface ISubjectTopic {
  id: number;
  curriculum_id: number;
  curriculum_name: string;
  subject_id: number;
  subject_name: string;
  subject_code: string;
  semester: string;
  education_type: IEducationType;
  department: IDepartment;
  topic_count: number;
  active_topic_count: number;
  trainings: ITraining[];
}

export interface IGroup {
  id: number;
  name: string;
  specialty_id?: number;
  specialty_name?: string;
}

export interface ICurriculum {
  id: number;
  name: string;
  education_year?: string;
  specialty_id?: number;
  specialty_name?: string;
}

export interface ISubject {
  id: number;
  name: string;
  code: string;
  curriculum_subject_id?: number;
}

export interface IBaseName {
  code: string;
  name: string;
  active?: boolean;
  position?: number;
}

export type ISemester = IBaseName;
export type IEducationYear = IBaseName;

export interface ISubjectInfo {
  curriculum: ICurriculum;
  subject: ISubject;
  semester: ISemester;
  education_year: IEducationYear;
  education_type: IEducationType;
  trainings: ITraining[];
  groups: IGroup[];
}

export interface ITaskType {
  code: string;
  name: string;
}

export interface ILanguage {
  code: string;
  name: string;
}

export type ITrainingType = IBaseName;

export interface IExamType {
  code: string;
  name: string;
}

export interface IStatus {
  active: boolean;
  label: string;
}

export interface ISubjectTask {
  id: number;
  name: string;
  comment: string;
  task_type: ITaskType;
  subject: ISubject;
  curriculum: ICurriculum;
  language: ILanguage;
  training_type: ITrainingType;
  exam_type: IExamType;
  semester: string;
  education_year: string;
  max_ball: number;
  deadline: string;
  attempt_count: number;
  question_count: number;
  test_duration: number;
  file_count: number;
  test_questions_count: number;
  position: number | null;
  random: boolean;
  active: boolean;
  status: IStatus;
  is_test_task: boolean;
  is_regular_task: boolean;
  can_submit_task: boolean;
  can_start_test: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface IClass {
  id: number;
  subject: ISubject;
  group: IGroup;
  time: IClassTime;
  training_type: string;
  semester: number;
  auditorium: number;
}

export interface IClassTime {
  pair_number: number | null;
  start: string;
  end: string;
  range: string;
}

export interface ISchedule {
  date: string;
  day: number;
  day_name: string;
  formatted_date: string;
  classes: IClass[];
}

export enum SubjectFilters {
  EducationYears = "education_years",
  Semesters = "semesters",
  Groups = "groups",
  Subjects = "subjects",
  Curriculums = "curriculums",
  TrainingTypes = "training_types",
}

export const ALL_SUBJECT_FILTERS = [
  SubjectFilters.EducationYears,
  SubjectFilters.Curriculums,
  SubjectFilters.Semesters,
  SubjectFilters.TrainingTypes,
  SubjectFilters.Groups,
  SubjectFilters.Subjects,
];

export interface IFiltersRes {
  [SubjectFilters.EducationYears]: IEducationYear[];
  [SubjectFilters.Semesters]: ISemester[];
  [SubjectFilters.Groups]: IGroup[];
  [SubjectFilters.Subjects]: ISubject[];
  [SubjectFilters.Curriculums]: ICurriculum[];
  [SubjectFilters.TrainingTypes]: ITrainingType[];
}

export enum FilterItem {
  EducationYear = "education_year",
  Semester = "semester",
  Group = "group_id",
  Curriculum = "curriculum_id",
  Subject = "subject_id",
}

export interface IFiltersForm {
  [FilterItem.EducationYear]?: IEducationYear["code"];
  [FilterItem.Semester]?: ISemester["code"];
  [FilterItem.Curriculum]?: ICurriculum["id"];
  [FilterItem.Group]?: IGroup["id"];
  [FilterItem.Subject]?: ISubject["id"];
}

export const ALL_FILTER_KEYS = [
  FilterItem.Curriculum,
  FilterItem.EducationYear,
  FilterItem.Group,
  FilterItem.Semester,
  FilterItem.Subject,
];

export interface IResourceItem {
  id: number;
  resource_type: {
    code: string;
  };
  comment: string;
  files: IFileProps[];
  url: string;
  has_files: boolean;
  has_url: boolean;
  created_at: string;
}

export interface ITeacherResource {
  id: number;
  title: string;
  comment: string | null;
  subject: ISubject;
  curriculum: ICurriculum;
  resource_type: string | null;
  language: ILanguage[];
  files: IFileProps[] | null;
  files_count: number;
  url: string | null;
  urls_count: number;
  items: IResourceItem[];
  items_count: number;
  position: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}
