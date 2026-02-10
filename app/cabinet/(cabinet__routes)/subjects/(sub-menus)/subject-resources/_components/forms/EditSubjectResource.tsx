"use client";

import CustomMultiSelect from "@/components/shared/CustomMultiSelect";
import CustomSelect from "@/components/shared/CustomSelect";
import Flex from "@/components/shared/Flex";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { editResourceAction } from "@/lib/actions/subject.action";
import paths from "@/lib/paths";
import { ICreateResourceBody } from "@/lib/schemas/subject.schema";
import {
  ILanguage,
  ISubject,
  ITeacherResource,
} from "@/lib/services/subject/type";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const EditSubjectResourceForm = ({
  subjectList = [],
  languageList = [],
  resourceItem,
}: {
  subjectList?: ISubject[];
  languageList?: ILanguage[];
  resourceItem: ITeacherResource;
}) => {
  const { handleSubmit, control } = useForm<ICreateResourceBody>({
    defaultValues: {
      title: resourceItem?.title || "",
      comment: resourceItem?.comment || "",
      language: resourceItem?.language || [],
      subject_id: resourceItem?.subject?.id,
      files: [],
    },
  });

  const { mutate: editResource, isPending } = useMutation({
    mutationFn: async (body: ICreateResourceBody) =>
      editResourceAction({
        body: { ...body, files: [] },
        params: { resourceId: resourceItem?.id },
      }),
  });

  const handleEditResource = async (data: ICreateResourceBody) => {
    editResource(data, {
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
    });
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(handleEditResource)}>
      <Flex vertical gap={4} className="w-full">
        <Flex
          vertical
          gap={6}
          className="w-full bg-[var(--card)] px-[12px] sm:px-[50px] py-[45px] rounded-[8px]"
        >
          {/* Training Type */}
          <label className="w-full flex flex-col gap-2">
            Resurs nomi
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input placeholder="Resurs nomini kiriting" {...field} />
              )}
            />
          </label>

          <Flex gap={2} align="center" className="w-full">
            <label className="w-full flex flex-col gap-2">
              Fan
              <Controller
                name="subject_id"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    showSearch
                    allowClear
                    value={field?.value}
                    onValueChange={field?.onChange}
                    placeholder="Fanni tanlang"
                    options={subjectList?.map((t) => ({
                      label: t?.name,
                      value: t?.id,
                    }))}
                  />
                )}
              />
            </label>
            <label className="w-full flex flex-col gap-2">
              Til
              <Controller
                name="language"
                control={control}
                render={({ field }) => (
                  <CustomMultiSelect
                    showSearch
                    allowClear
                    value={field?.value}
                    onValueChange={field?.onChange}
                    placeholder="Tilni tanlang"
                    options={languageList?.map((t) => ({
                      label: t?.name,
                      value: t?.code,
                    }))}
                  />
                )}
              />
            </label>
          </Flex>
          <label className="w-full flex flex-col gap-2">
            Izoh
            <Controller
              name="comment"
              control={control}
              render={({ field }) => (
                <Textarea placeholder="Izoh qoldiring" {...field} />
              )}
            />
          </label>
        </Flex>

        <Flex gap={2} justify="end" align="center" className="flex-wrap w-full">
          <Link href={`${paths.private.subjects.resourcesBase}`}>
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

export default EditSubjectResourceForm;
