export interface IDashboardStats {
  summary: {
    todayClasses: number;
    totalStudents: number;
    totalSubjects: number;
    totalGroups: number;
    pendingAssignments: number;
    pendingAttendance: number;
    weeklyClasses: number;
  };
  pendingAttendanceClasses: unknown[];
  todaySchedule: {
    date: string;
    dayName: string;
    classes: unknown[];
  };
  quickStats: {
    attendanceRate: number;
    upcomingExams: number;
  };
}
