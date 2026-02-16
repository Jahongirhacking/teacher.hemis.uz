import useConst from "@/lib/hooks/useConst";
import MenuContainer from "../../_components/MenuContainer";

const TrainingPage = () => {
  const { sideNavMenuItems, navbarCodes, findMenuWithPath } = useConst();
  const subjectMenus = findMenuWithPath(
    navbarCodes?.trainings,
    sideNavMenuItems,
  )?.children;

  return <MenuContainer menus={subjectMenus || []} />;
};

export default TrainingPage;
