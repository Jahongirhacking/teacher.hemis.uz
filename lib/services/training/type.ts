import {
  IEducationYear,
  IGroup,
  ISemester,
  ISubject,
  ITrainingType,
} from "../subject/type";
import { IBaseDataWithMeta } from "../type";

export interface IAttendanceJournalItem {
  group: IGroup;
  subject: ISubject;
  training_type: ITrainingType;
  education_year: IEducationYear;
  semester: ISemester;
  journal_params: {
    education_year: string;
    semester: string;
    group_id: number;
    subject_id: number;
    training_type: string;
  };
}

export interface IAttendanceJournalRes extends IBaseDataWithMeta {
  items: IAttendanceJournalItem[];
}
