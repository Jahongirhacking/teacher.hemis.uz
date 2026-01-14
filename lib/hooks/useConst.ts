import { ProfileMenuIcons, SideNavIcons } from "@/public/icons";
import { JSX } from "react";
import paths from "../paths";

export interface IMenu {
  label: string;
  href?: string;
  action?: () => void;
  icon?: () => JSX.Element;
  children?: IMenu[];
}

export const findMenuWithPath = (
  path: IMenu["href"],
  menus?: IMenu[],
): IMenu | undefined => {
  if (!menus || !menus?.length) return;
  const found = menus?.find((m) => m?.href === path);
  if (found) return found;
  menus
    ?.filter((m) => !!m?.children?.length)
    ?.forEach((m) => {
      const found = findMenuWithPath(path, m?.children);
      if (found) return found;
    });
};

const useConst = () => {
  const sideNavMenuItems: IMenu[] = [
    {
      label: "Dashboard",
      href: paths.private.dashboard,
      icon: SideNavIcons.DashboardIcon,
    },
    {
      label: "Personal",
      icon: SideNavIcons.PersonalIcon,
      children: [],
    },
    {
      label: "Fanlar",
      href: paths.private.subjects,
      icon: SideNavIcons.SubjectsIcon,
    },
    {
      label: "Mashg'ulotlar",
      icon: SideNavIcons.ActivitiesIcon,
      children: [],
    },
    {
      label: "Nazoratlar",
      icon: SideNavIcons.ControlTasksIcon,
      children: [],
    },
    {
      label: "Yakka darslar",
      icon: SideNavIcons.SoloLessonsIcon,
      children: [],
    },
    {
      label: "Ilmiy ishlar",
      icon: SideNavIcons.AcademicWorksIcon,
      children: [],
    },
    {
      label: "Sozlamalar",
      icon: SideNavIcons.SettingsIcon,
      href: paths.private.settings,
    },
  ];

  const profileMenuItems: IMenu[] = [
    {
      label: "Profil",
      icon: ProfileMenuIcons.ProfileIcon,
    },
    {
      label: "Passport ma'lumotlari",
      icon: ProfileMenuIcons.PassportInfoIcon,
    },
    {
      label: "Mehnat ma'lumotlari",
      icon: ProfileMenuIcons.ProfessionInfoIcon,
    },
    {
      label: "Ilmiy ma'lumotlari",
      icon: ProfileMenuIcons.AcademicInfoIcon,
    },
    {
      label: "Shaxsiy ish reja",
      icon: ProfileMenuIcons.PrivateWorkPlanIcon,
    },
    {
      label: "Tanlov ma'lumotlari",
      icon: ProfileMenuIcons.PrivateWorkPlanIcon,
    },
    {
      label: "Malaka oshirish",
      icon: ProfileMenuIcons.AdvancedTrainingIcon,
    },
    {
      label: "Stajirovka",
      icon: ProfileMenuIcons.InternshipIcon,
    },
    {
      label: "Ilmiy metodik ishlar",
      icon: ProfileMenuIcons.AcademicMethodicIcon,
    },
  ];

  return {
    sideNavMenuItems,
    profileMenuItems,
    findMenuWithPath,
  };
};

export default useConst;
