/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomSelect from "@/components/shared/CustomSelect";
import Flex from "@/components/shared/Flex";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { editSubjectTopicAction } from "@/lib/actions/subject.action";
import paths from "@/lib/paths";
import { ICreateTopicBody } from "@/lib/schemas/subject.schema";
import { FetchResult } from "@/lib/services/api";
import { ISubjectTopicItem, ITrainingType } from "@/lib/services/subject/type";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface IFormValues {
  trainingType: ITrainingType["code"];
  name: string;
  acload: number;
}

const EditTopicForm = ({
  topicContainerId,
  topicId,
  trainingTypes = [],
  subjectTopicItem,
}: {
  topicContainerId: string;
  topicId: string;
  trainingTypes?: ITrainingType[];
  subjectTopicItem?: ISubjectTopicItem | null;
}) => {
  const { handleSubmit, control, reset } = useForm<IFormValues>({
    defaultValues: {
      trainingType: subjectTopicItem?.training_type || "",
      name: subjectTopicItem?.name || "",
      acload: subjectTopicItem?.topic_load || 0,
    },
  });

  useEffect(() => {
    reset({
      trainingType: subjectTopicItem?.training_type || "",
      name: subjectTopicItem?.name || "",
      acload: subjectTopicItem?.topic_load || 0,
    });
  }, [subjectTopicItem, reset]);

  const { mutate: createTopic, isPending } = useMutation<
    FetchResult<any>,
    Error,
    ICreateTopicBody
  >({
    mutationFn: async (body: ICreateTopicBody): Promise<any> =>
      editSubjectTopicAction({
        params: { topicId },
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
          toast.success("Mavzu muvaffaqiyatli tahrirlandi!");
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
          <Link
            href={`${paths.private.subjects.subjectTopics}/${topicContainerId}`}
          >
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

export default EditTopicForm;
