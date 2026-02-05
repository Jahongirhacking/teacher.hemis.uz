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
    },
    settings: `${privatePath}/settings`,
    profile: {
      info: `${privatePath}/profile/info`,
      passport: `${privatePath}/profile/passport`,
    },
  },
  reservedKeys: {
    create: "create",
    edit: "edit",
  },
};

export default paths;
