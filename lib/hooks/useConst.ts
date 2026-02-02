import { ProfileMenuIcons, SettingsIcon, SideNavIcons } from "@/public/icons";
import { JSX } from "react";
import paths from "../paths";

export interface IMenu {
  label: string;
  href?: string;
  action?: () => void;
  icon?: () => JSX.Element;
  children?: IMenu[];
  code?: string;
}

export const findMenuWithPath = (
  path: IMenu["href"],
  menus?: IMenu[],
): IMenu | undefined => {
  if (!menus || !menus?.length) return;
  const found = menus?.find((m) => m?.href === path || m?.code === path);
  if (found) return found;

  for (const menu of menus) {
    if (menu?.children?.length) {
      const childFound = findMenuWithPath(path, menu.children);
      if (childFound) return childFound;
    }
  }
};

const navbarCodes = {
  subjects: paths.private.subjects.base,
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
      code: navbarCodes.subjects,
      label: "Fanlar",
      icon: SideNavIcons.SubjectsIcon,
      children: [
        {
          label: "Fan ma'lumotlari",
          href: paths.private.subjects.subjectInfo,
        },
        {
          label: "Fan mavzulari",
          href: paths.private.subjects.subjectTopics,
        },
        {
          label: "Resurslar bazasi",
          href: paths.private.subjects.resourcesBase,
        },
        {
          label: "Fanlar resurslari",
          href: paths.private.subjects.subjectResources,
        },
        {
          label: "Topshiriqlar bazasi",
          href: paths.private.subjects.tasksBase,
        },
        {
          label: "Fan topshiriqlari",
          href: paths.private.subjects.subjectTasks,
        },
        {
          label: "Topshiriqlarni baholash",
          href: paths.private.subjects.tasksAssessment,
        },
      ],
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
  ];

  const profileMenuItems: IMenu[] = [
    {
      label: "Profil",
      icon: ProfileMenuIcons.ProfileIcon,
      href: paths.private.profile.info,
    },
    {
      label: "O’qituvchi passporti",
      icon: ProfileMenuIcons.TeacherPassportIcon,
      href: paths.private.profile.passport,
    },
    {
      label: "Sozlamalar",
      icon: SettingsIcon,
      href: paths.private.settings,
    },
  ];

  return {
    sideNavMenuItems,
    profileMenuItems,
    findMenuWithPath,
    navbarCodes,
  };
};

export default useConst;
