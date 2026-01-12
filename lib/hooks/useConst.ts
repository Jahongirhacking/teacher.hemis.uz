import { JSX } from "react";
import paths from "../paths";
import { SideNavIcons } from "@/public/icons";

interface IMenu {
  label: string;
  href?: string;
  action?: () => void;
  icon?: () => JSX.Element;
  children?: IMenu[];
}

const useConst = () => {
  const sideNavMenus: IMenu[] = [
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
      children: [],
    },
  ];

  return {
    sideNavMenus,
  };
};

export default useConst;
