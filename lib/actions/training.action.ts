import { handlePrivateRequest } from ".";
import { getAttendanceJournal } from "../services/training";

export const getAttendanceJournalAction = async (
  props: Parameters<typeof getAttendanceJournal>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      getAttendanceJournal({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};
