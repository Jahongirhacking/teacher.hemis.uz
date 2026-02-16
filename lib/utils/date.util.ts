import moment, { Moment } from "moment";

export enum LangType {
  Uzbek = "uz-UZ",
  Karakalpak = "qk-QK",
  English = "en-US",
  Russian = "ru-RU",
}
type LangValues = [uz: string, oz: string, en: string, ru: string];
interface ILangResource {
  long: LangValues;
  short: LangValues;
}

const getTranslation = (args: LangValues, lang?: LangType): string => {
  switch (lang) {
    case LangType.Uzbek:
      return args[0];
    case LangType.Karakalpak:
      return args[1];
    case LangType.English:
      return args[2];
    case LangType.Russian:
      return args[3];
    default:
      return args[0];
  }
};

export const monthNames: ILangResource[] = [
  {
    long: ["yanvar", "январ", "january", "январь"],
    short: ["yan", "янв", "jan", "янв"],
  },
  {
    long: ["fevral", "феврал", "february", "февраль"],
    short: ["fev", "фев", "feb", "фев"],
  },
  {
    long: ["mart", "март", "march", "март"],
    short: ["mar", "мар", "mar", "мар"],
  },
  {
    long: ["aprel", "апрел", "april", "апрель"],
    short: ["apr", "апр", "apr", "апр"],
  },
  {
    long: ["may", "май", "may", "май"],
    short: ["may", "май", "may", "май"],
  },
  {
    long: ["iyun", "июн", "june", "июнь"],
    short: ["iyn", "июн", "jun", "июн"],
  },
  {
    long: ["iyul", "июл", "july", "июль"],
    short: ["iyl", "июл", "jul", "июл"],
  },
  {
    long: ["avgust", "август", "august", "август"],
    short: ["avg", "авг", "aug", "авг"],
  },
  {
    long: ["sentabr", "сентябр", "september", "сентябрь"],
    short: ["sen", "сен", "sep", "сен"],
  },
  {
    long: ["oktabr", "октябр", "october", "октябрь"],
    short: ["okt", "окт", "oct", "окт"],
  },
  {
    long: ["noyabr", "ноябр", "november", "ноябрь"],
    short: ["noy", "ноя", "nov", "ноя"],
  },
  {
    long: ["dekabr", "декабр", "december", "декабрь"],
    short: ["dek", "дек", "dec", "дек"],
  },
];

export const dayNames: ILangResource[] = [
  {
    short: ["Yak", "Якш", "Sun", "Вос"],
    long: ["Yakshanba", "Якшанба", "Sunday", "Воскресенье"],
  },
  {
    short: ["Dush", "Душ", "Mon", "Пон"],
    long: ["Dushanba", "Душанба", "Monday", "Понедельник"],
  },
  {
    short: ["Sesh", "Сеш", "Tue", "Вт"],
    long: ["Seshanba", "Сешанба", "Tuesday", "Вторник"],
  },
  {
    short: ["Chor", "Чор", "Wed", "Ср"],
    long: ["Chorshanba", "Чоршанба", "Wednesday", "Среда"],
  },
  {
    short: ["Pay", "Пай", "Thu", "Чет"],
    long: ["Payshanba", "Пайшанба", "Thursday", "Четверг"],
  },
  {
    short: ["Jum", "Жум", "Fri", "Пят"],
    long: ["Juma", "Жума", "Friday", "Пятница"],
  },
  {
    short: ["Shan", "Шан", "Sat", "Суб"],
    long: ["Shanba", "Шанба", "Saturday", "Суббота"],
  },
];

export const getTranslatedName = (
  resource: ILangResource[],
  index: number,
  type: "long" | "short",
  lang?: LangType,
) => {
  return getTranslation(resource[index][type], lang);
};

/**
 *
 * @param date
 * @returns "2-mart, 03:59"
 */
export const convertDateToDayTimeString = (
  date: number,
  type: "long" | "short" = "long",
  lang?: LangType,
) => {
  if (!date) return "";
  const dateObj = moment.unix(date);
  const day = dateObj.date();
  const month = getTranslatedName(monthNames, dateObj.month(), type, lang);
  const hours = String(dateObj.hour()).padStart(2, "0");
  const minutes = String(dateObj.minute()).padStart(2, "0");
  return `${day}-${month}, ${hours}:${minutes}`;
};

/**
 * "03:59"
 * @param date
 * @returns
 */
export const convertDateToTimeString = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const getDateAfterDays = (prevDate: Date, step: number = 1) => {
  const newDate = new Date(prevDate);
  newDate.setDate(prevDate.getDate() + step);
  return newDate;
};

/**
 * "Yakshanba" | "Yak"
 * @param date
 * @param type
 * @returns
 */
export const convertDateToDayName = (
  date: number,
  type: "short" | "long" = "short",
  lang?: LangType,
) => {
  const dayIndex = moment.unix(date).toDate().getDay();
  if (dayIndex >= 0 && dayIndex <= 6)
    return getTranslatedName(dayNames, dayIndex, type, lang);
  return;
};

export const currentDate =
  new Date().toISOString().slice(0, 10) + `T00:00:00.000Z`;
export const currentEpochTime = new Date(currentDate).getTime();

/**
 * 08:30 -> 8*60+30
 * @param timeString
 * @returns
 */
export const timeStringToMinutes = (timeString: string) => {
  try {
    if (!timeString) {
      throw new Error("Vaqt formatida xatolik");
    }
    const [hours, minutes] = timeString?.split(":")?.map(Number);
    const totalMinutes = hours * 60 + minutes;
    return totalMinutes;
  } catch (err) {
    console.error(err);
  }
};

/**
 * Kunning qaysidir qismidagi "timestamp"dan, o'sha kunning "timeString" vaqtiga o'tkazish
 * @param date
 * @param timeString
 * @returns
 */
export const setTimeToTimestamp = (
  date: Moment,
  timeString: string,
): Moment => {
  if (!date || !timeString) return date;
  const timeParts = timeString?.split(":");
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  return date
    .clone()
    .set({ hour: hours, minute: minutes, second: 0, millisecond: 0 });
};

/**
 * Oxirgi dushanba topish
 * @param date
 * @returns
 */
export const getLatestMondayUnixTimestamp = (date: Moment) => {
  const daysToSubtract = date.day() === 1 ? 0 : (date.day() + 6) % 7;
  const latestMonday = date.subtract(daysToSubtract, "days");
  return latestMonday.startOf("day").unix();
};

/**
 * Agar kun formatda -> kunning o'zini qaytarish, yakshanbasiz
 * Agar hafta formatda -> oxirgi dushanba
 * @param date
 * @param activeOption
 * @returns
 */
export const getStartingDateUnixTimeStamp = (
  date: Moment,
  activeOption: "month" | "week" | "day",
) => {
  if (date.day() === 0) {
    date?.clone().add(1, "day");
  }

  if (activeOption === "day") {
    return date?.clone().startOf("day").unix();
  }
  if (activeOption === "week") {
    return getLatestMondayUnixTimestamp(date?.clone());
  }
  if (activeOption === "month") {
    return date?.clone().startOf("month");
  }

  return;
};

/**
 * Kun oy: 18 May
 * @param date
 * @returns
 */
export const formatUnixTimestampToDate = (
  date: Moment,
  sep: string = " ",
  type: "long" | "short" = "long",
  lang?: LangType,
) => {
  const day = date?.clone().date();
  const monthIndex = date.month();
  if (monthIndex >= 0 && monthIndex <= 11)
    return `${day}${sep}${getTranslatedName(monthNames, monthIndex, type, lang)}`;
  return;
};

// Format seconds → dd:hh:mm:ss
export const formatTime = (seconds: number | null) => {
  if (seconds === null) return "--:--";
  if (seconds < 0) return "00:00";
  const days = Math.floor(seconds / 86400);
  const rem = seconds % 86400;
  const h = Math.floor(rem / 3600);
  const m = Math.floor((rem % 3600) / 60);
  const s = rem % 60;

  return `${days > 0 ? `${days} kun / ` : ""}${h > 0 ? `${String(h).padStart(2, "0")}:` : ""}${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export const getRightTimeString = (dateTime: Moment): string => {
  const now = moment();
  if (now.clone().startOf("day").isBefore(dateTime))
    return dateTime.format("HH:mm");
  if (now.clone().subtract(1, "day").isBefore(dateTime))
    return `${now.diff(dateTime, "hours")} soat oldin`;
  if (now.clone().subtract(1, "week").isBefore(dateTime))
    return `${now.diff(dateTime, "days")} kun oldin`;
  if (now.clone().subtract(1, "months").isBefore(dateTime))
    return `${now.diff(dateTime, "weeks")} hafta oldin`;
  if (now.clone().subtract(1, "years").isBefore(dateTime))
    return `${now.diff(dateTime, "months")} oy oldin`;
  return `${now.diff(dateTime, "years")} yil oldin`;
};
