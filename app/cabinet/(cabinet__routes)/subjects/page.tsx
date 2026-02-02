import useConst from "@/lib/hooks/useConst";
import MenuContainer from "../../_components/MenuContainer";

const SubjectPage = () => {
  const { sideNavMenuItems, navbarCodes, findMenuWithPath } = useConst();
  const subjectMenus = findMenuWithPath(
    navbarCodes?.subjects,
    sideNavMenuItems,
  )?.children;

  return <MenuContainer menus={subjectMenus || []} />;
};

export default SubjectPage;
