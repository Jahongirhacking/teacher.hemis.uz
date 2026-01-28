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
  topic_count: number;
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
