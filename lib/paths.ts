const privatePath = "/cabinet";

export const paths = {
  base: "/",
  private: {
    base: privatePath,
    dashboard: `${privatePath}/dashboard`,
    subjects: {
      base: `${privatePath}/subjects`,
      subjectInfo: `${privatePath}/subjects/subject-info`,
      tasksBase: `${privatePath}/subjects/tasks-base`,
      subjectResources: `${privatePath}/subjects/subject-resources`,
      subjectTasks: `${privatePath}/subjects/subject-tasks`,
      subjectTopics: `${privatePath}/subjects/subject-topics`,
      resourcesBase: `${privatePath}/subjects/resources-base`,
      tasksAssessment: `${privatePath}/subjects/tasks-assessment`,
      tests: `${privatePath}/subjects/tests`,
    },
    settings: `${privatePath}/settings`,
    profile: {
      info: `${privatePath}/profile/info`,
      passport: `${privatePath}/profile/passport`,
    },
    trainings: {
      base: `${privatePath}/trainings`,
      timetable: `${privatePath}/trainings/timetable`,
      takeLesson: `${privatePath}/trainings/take-lesson`,
      attendanceJournal: `${privatePath}/trainings/attendance-journal`,
      gradingJournal: `${privatePath}/trainings/grading-journal`,
      calendarPlan: `${privatePath}/trainings/calendar-plan`,
    },
  },
  reservedKeys: {
    create: "create",
    edit: "edit",
    result: "result",
    assessment: "assessment",
  },
};

export default paths;
