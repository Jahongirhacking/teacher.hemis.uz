const privatePath = "/cabinet";

export const paths = {
  base: "/",
  private: {
    base: privatePath,
    dashboard: `${privatePath}/dashboard`,
    subjects: `${privatePath}/subjects`,
    settings: `${privatePath}/settings`,
  },
};

export default paths;
