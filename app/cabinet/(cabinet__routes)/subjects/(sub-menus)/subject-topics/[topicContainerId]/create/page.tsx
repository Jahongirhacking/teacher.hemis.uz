import Flex from "@/components/shared/Flex";
import EduInfoTable from "../../../../_components/tables/EduInfoTable";
import CreateTopicForm from "./_components/CreateTopicForm";

const CreateTopicItemPage = async ({ params }) => {
  const { topicContainerId } = await params;

  return (
    <Flex vertical gap={5} align="center" className="w-full">
      <Flex className="w-full">
        <h3 className="text-[var(--header-primary-foreground)] font-bold text-[18px]">
          Mavzu yaratish
        </h3>
      </Flex>
      <Flex vertical align="center" gap={4} className="max-w-[688px] w-full">
        <EduInfoTable
          dataSource={[
            {
              subject: "_",
            },
          ]}
          pagination={false}
        />
        <CreateTopicForm id={topicContainerId} />
      </Flex>
    </Flex>
  );
};

export default CreateTopicItemPage;
