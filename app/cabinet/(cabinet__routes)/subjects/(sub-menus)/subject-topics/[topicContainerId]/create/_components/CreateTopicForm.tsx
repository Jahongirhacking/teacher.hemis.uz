"use client";

import CustomSelect from "@/components/shared/CustomSelect";
import Flex from "@/components/shared/Flex";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import paths from "@/lib/paths";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

interface IFormValues {
  trainingType: number | string;
  name: string;
  acload: number | string;
}

const CreateTopicForm = ({ id }: { id: string }) => {
  const { handleSubmit, control } = useForm<IFormValues>({
    defaultValues: {
      trainingType: "",
      name: "",
      acload: "",
    },
  });

  const handleFormSubmit = (data: IFormValues) => {
    console.log(data, id, "form data with id");
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(handleFormSubmit)}>
      <Flex vertical gap={4} className="w-full">
        <Flex
          vertical
          gap={6}
          className="w-full bg-[var(--card)] px-[12px] sm:px-[50px] py-[45px] rounded-[8px]"
        >
          {/* Training Type */}
          <label className="w-full flex flex-col gap-2">
            Mashg&apos;ulot
            <Controller
              name="trainingType"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  value={field?.value}
                  onValueChange={field?.onChange}
                  placeholder="Mashg'ulotni tanlang"
                  options={[{ label: "Ma'ruza", value: 11 }]}
                />
              )}
            />
          </label>

          {/* Name */}
          <label className="w-full flex flex-col gap-2">
            Mashg&apos;ulot nomi
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Textarea {...field} placeholder="Mashg'ulot nomini kiriting" />
              )}
            />
          </label>

          {/* Acload */}
          <label className="w-full flex flex-col gap-2">
            Yuklama
            <Controller
              name="acload"
              control={control}
              render={({ field }) => (
                <Input {...field} type="number" placeholder="Yuklama soati" />
              )}
            />
          </label>
        </Flex>

        <Flex gap={2} justify="end" align="center" className="flex-wrap w-full">
          <Link href={`${paths.private.subjects.subjectTopics}/${id}`}>
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

export default CreateTopicForm;
