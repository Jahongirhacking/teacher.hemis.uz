"use server";

import { handlePrivateRequest } from ".";
import { getDashboardStats } from "../services/stat";

export const getDashboardStatsAction = async () => {
  try {
    return handlePrivateRequest((serverProps) =>
      getDashboardStats({ ...serverProps }),
    );
  } catch (err) {
    console.error(err);
  }
};
