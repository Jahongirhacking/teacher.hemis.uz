/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomSelect from "@/components/shared/CustomSelect";
import Flex from "@/components/shared/Flex";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createSubjectTopicAction } from "@/lib/actions/subject.action";
import paths from "@/lib/paths";
import { ICreateTopicBody } from "@/lib/schemas/subject.schema";
import { FetchResult } from "@/lib/services/api";
import { ITrainingType } from "@/lib/services/subject/type";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface IFormValues {
  trainingType: ITrainingType["code"];
  name: string;
  acload: number;
}

const CreateTopicForm = ({
  id,
  trainingTypes = [],
}: {
  id: string;
  trainingTypes?: ITrainingType[];
}) => {
  const { handleSubmit, control, reset } = useForm<IFormValues>({
    defaultValues: {
      trainingType: "",
      name: "",
      acload: 0,
    },
  });

  const { mutate: createTopic, isPending } = useMutation<
    FetchResult<any>,
    Error,
    ICreateTopicBody
  >({
    mutationFn: async (body: ICreateTopicBody): Promise<any> =>
      createSubjectTopicAction({
        params: { topicContainerId: id },
        body,
      }),
  });

  const handleCreateTopic = async (data: IFormValues) => {
    createTopic(
      {
        name: data?.name,
        _training_type: data?.trainingType,
        topic_load: data?.acload,
      },
      {
        onSuccess: (result) => {
          toast.dismiss();
          if (!result?.success) {
            toast.error(result?.error?.message || "");
            return;
          }
          toast.success("Mavzu muvaffaqiyatli yaratildi!");
          handleClearForm();
        },
        onError: (err) => {
          toast.dismiss();
          console.error(err);
          toast.error(
            (err as { message: string })?.message || "Tizimga kirishda xatolik",
          );
        },
      },
    );
  };

  const handleClearForm = () => {
    reset();
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(handleCreateTopic)}>
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
                  showSearch
                  allowClear
                  value={field?.value}
                  onValueChange={field?.onChange}
                  placeholder="Mashg'ulotni tanlang"
                  options={trainingTypes?.map((t) => ({
                    label: t?.name,
                    value: t?.code,
                  }))}
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
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader className="animate-spin" />} Saqlash
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default CreateTopicForm;
