"use client";

import CustomSelect from "@/components/shared/CustomSelect";
import { FileUploader } from "@/components/shared/FileUploader";
import Flex from "@/components/shared/Flex";
import useFileUpload from "@/components/shared/hooks/useFileUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import paths from "@/lib/paths";
import { ITeacherResource } from "@/lib/services/subject/type";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

const EditResourceForm = ({
  resourceItem,
}: {
  resourceItem: ITeacherResource;
}) => {
  const { handleSubmit, control } = useForm();
  const { files, setFiles } = useFileUpload();
  console.log(resourceItem);

  const handleEditResource = async (data: object) => {
    console.log(data);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(handleEditResource)}>
      <Flex vertical gap={4} className="w-full">
        <Flex
          vertical
          gap={6}
          className="w-full bg-[var(--card)] px-[12px] sm:px-[50px] py-[45px] rounded-[8px]"
        >
          <Flex vertical gap={4} className="w-full">
            {/* Training Type */}
            <label className="w-full flex flex-col gap-2">
              Fayl turi
              <Controller
                name="_file_type"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    placeholder="Resurs nomini kiriting"
                    value={field?.value}
                    onValueChange={field?.onChange}
                    options={[]}
                  />
                )}
              />
            </label>
            <label className="w-full flex flex-col gap-2">
              URL
              <Controller
                name="_url"
                control={control}
                render={({ field }) => (
                  <Input placeholder="https://" {...field} />
                )}
              />
            </label>
          </Flex>

          <Flex vertical gap={4} className="w-full">
            <label className="w-full flex flex-col gap-2">
              Izoh
              <Controller
                name="_comment"
                control={control}
                render={({ field }) => (
                  <Textarea placeholder="Izoh qoldiring" {...field} />
                )}
              />
            </label>

            <FileUploader
              moduleName="study_resources"
              folder="resources-base"
              files={files}
              setFiles={setFiles}
            />
          </Flex>
        </Flex>

        <Flex gap={2} justify="end" align="center" className="flex-wrap w-full">
          <Link href={`${paths.private.subjects.resourcesBase}`}>
            <Button variant={"secondary"} type="button">
              Bekor qilish
            </Button>
          </Link>
          <Button type="submit">Saqlash</Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default EditResourceForm;
