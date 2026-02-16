import { ISubmitFile } from "@/lib/schemas/file.schema";
import { IFileProps } from "../type";

export interface IEducationType {
  code: string;
  name: string;
}

export interface IDepartment {
  id: number;
  name: string;
}

export interface IFaculty {
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

export interface ICurriculumSubject {
  id: number;
  curriculum_id: number;
  curriculum_name: string;
  subject_id: number;
  subject_name: string;
  subject_code: string;
  semester: ISemester;
  education_year: IEducationYear;
  education_type: IEducationType;
  department: IDepartment;
  topic_count: number;
  active_topic_count: number;
  trainings: ITraining[];
  faculty: IFaculty;
}

export interface ISubjectTopicItem {
  id: number;
  name: string;
  translated_name: string;
  full_name: string;
  curriculum_id: number;
  subject_id: number;
  semester: string;
  training_type: string;
  training_type_name: string;
  department_id: number;
  position: number | null;
  topic_load: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ITrainingTypeStat {
  training_type: string;
  training_type_name: string;
  topic_count: number;
  total_load: number;
}

export interface ISubjectTopicStats {
  total_topics: number;
  active_topics: number;
  total_load: number;
  by_training_type: ITrainingTypeStat[];
}

export interface ISubjectTopic {
  curriculum_subject: ICurriculumSubject;
  items: ISubjectTopicItem[];
  total: number;
  stats: ISubjectTopicStats;
}

export interface ISubjectTopicItemRes {
  curriculum_subject: ICurriculumSubject;
  topic: ISubjectTopicItem;
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
  faculty: string;
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
  faculty: IFaculty;
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
  Languages = "languages",
}

export const ALL_SUBJECT_FILTERS = [
  SubjectFilters.EducationYears,
  SubjectFilters.Curriculums,
  SubjectFilters.Semesters,
  SubjectFilters.TrainingTypes,
  SubjectFilters.Groups,
  SubjectFilters.Subjects,
  SubjectFilters.Languages,
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
  TrainingType = "training_type",
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
  FilterItem.TrainingType,
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
  comment: string;
  _subject: number;
  _employee: number;
  language: string[];
  language_details: ILanguage[];
  files: ISubmitFile[];
  active: boolean;
  updated_at: string;
  created_at: string;
  assignments_count: number;
  subject: ISubjectDetail;
  employee: IEmployee;
}

export interface IEmployee {
  id: number;
  employee_id_number: string;
  first_name: string;
  second_name: string;
  third_name: string;
  birth_date: string;
  _gender: string;
  passport_number: string;
  passport_pin: string;
  _academic_degree: string;
  _academic_rank: string;
  specialty: string;
  image: string;
  position: number;
  active: boolean;
  _translations: Record<string, string>;
  updated_at: string;
  created_at: string;
  _admin: number;
  telephone: string;
  email: string;
  home_address: string;
  _citizenship: string;
  _uid: string;
  _sync: boolean;
  year_of_enter: number;
  _qid: string | null;
  _sync_diff: string;
  _sync_date: string;
  _sync_status: string;
  passport_date: string;
  _country: string;
  _province: string;
  _district: string;
  _nationality: string;
}

export interface ISubjectWithResources {
  id: number;
  subject: ISubject;
  curriculum: ICurriculum;
  education_year: IEducationYear["code"];
  semester: ISemester;
  training_type: ITrainingType | null;
  resources_count: number;
  created_at: string;
}

export interface IEducationTypeDetail extends IEducationType {
  position: number;
  active: boolean;
  _parent: null;
  _translations: string;
  _options: string;
  updated_at: string;
  created_at: string;
}

export interface ISemesterDetail extends ISemester {
  _parent: null;
  _translations: Record<string, string>;
  _options: Record<string, number>;
  updated_at: string;
  created_at: string;
}

export interface ISubjectDetail extends ISubject {
  _subject_group: string;
  _education_type: string;
  position: number | null;
  active: boolean;
  _translations: Record<string, string>;
  updated_at: string;
  created_at: string;
  in_curriculum: boolean;
  name_uz: string;
  name_ru: string;
  name_en: string;
}

export interface IStudyResourceSubjectOptions {
  education_types: IEducationTypeDetail[];
  education_years: string[];
  semesters: ISemesterDetail[];
  subjects: ISubjectDetail[];
}

export interface IStudyResourceOptions {
  subjects?: ISubjectDetail[];
  languages: ILanguage[];
}

export interface ISubjectResources {
  id: number;
  subject: ISubject;
  curriculum: ICurriculum;
  faculty?: {
    id: number | null;
    name: string | null;
  };
  education_type: IEducationType;
  education_year: string;
  semester: ISemester;
  lesson_count: number;
  resources_count: number;
}

export interface ISubjectResourceDetails {
  id: number;
  title: string | null;
  description: string | null;
  resource_type: number;
  file_path: string | null;
  file_size: number | null;
  file_type: string | null;
  url: string | null;
  topic_id: number | null;
  downloads_count: number;
  created_at: string;
}

export interface ISubjectTaskItem {
  id: number;
  subject: ISubject;
  curriculum: ICurriculum;
  training_type: ITrainingType;
  groups: string[];
  students_count: number;
  semester: string;
  education_year: string;
  education_lang: ILanguage;
  tasks_count: number;
  sent_students_count: number;
  not_sent_students_count: number;
}

export interface IPagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface ISubjectTaskStats {
  items: ISubjectTaskItem[];
  pagination: IPagination;
}

export interface ITaskAssessmentItem {
  id: number;
  name: string;
  task_type: ITaskType;
  exam_type: IExamType;
  max_ball: number;
  deadline: string;
  deadline_formatted: string;
  question_count: number;
  attempt_count: number;
  active: boolean;
  statistics: {
    given_count: number;
    passed_count: number;
    rated_count: number;
  };
  subject: ISubject;
  training_type: ITrainingType;
}

export interface ITaskAssessmentRes {
  items: ITaskAssessmentItem[];
  pagination: IPagination;
}

export interface IStudent {
  id: number;
  name: string;
  student_id_number: string;
}

export interface IGroup {
  id: number;
  name: string;
}

export interface ITaskStatus {
  code: string;
  name: string;
}

export interface ITaskSubmissionItem {
  id: number;
  student: IStudent;
  group: IGroup;
  final_exam_type: string;
  task_status: ITaskStatus;
  mark: number | null;
  marked_date: string | null;
  active: boolean;
  deadline: string;
  deadline_formatted: string;
  submitted_at: string | null;
  graded_at: string | null;
  created_at: string;
}

export interface ITaskSubmissionHeader {
  education_year: string;
  semester: string;
  subject: string;
  training_type: string;
  task_name: string;
}

export interface ITaskSubmissionStatistics {
  total: number;
  given: number;
  passed: number;
  rated: number;
}

export interface ITaskSubmissionRes {
  items: ITaskSubmissionItem[];
  header: ITaskSubmissionHeader;
  statistics: ITaskSubmissionStatistics;
  pagination: IPagination;
}

export interface IStudentTaskSubmissionDetail {
  id: number;
  student: IStudent;
  group: IGroup;
  subject: ISubject;
  training_type: string;
  task: {
    id: number;
    name: string;
    max_ball: number;
    task_type: string;
    comment: string;
  };
  answer: {
    comment: string | null;
    files: ISubmitFile[];
    submitted_at: string | null;
  };
  grading: {
    ball: number | null;
    max_ball: number;
    comment: string | null;
    graded_at: string | null;
  };
  task_status: ITaskStatus;
  final_exam_type: string;
  deadline: string;
  created_at: string;
}
