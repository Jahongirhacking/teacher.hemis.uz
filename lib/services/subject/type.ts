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
}

export interface ICurriculum {
  id: number;
  name: string;
}

export interface ISubject {
  id: number;
  name: string;
  code: string;
}

export interface ISemester {
  code: string;
  name: string;
}

export interface IEducationYear {
  code: string;
  name: string;
}

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

export interface ITrainingType {
  code: string;
  name: string;
}

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
