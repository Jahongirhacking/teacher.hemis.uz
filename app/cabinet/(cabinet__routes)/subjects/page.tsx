import SubjectTabs from "./_components/SubjectTabs";

const SubjectsPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-bold text-[18px] text-[var(--header-primary-foreground)]">
        Fanlar
      </h2>
      <SubjectTabs />
    </div>
  );
};

export default SubjectsPage;
