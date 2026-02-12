"use client";

import CustomMultiSelect from "@/components/shared/CustomMultiSelect";
import CustomSelect from "@/components/shared/CustomSelect";
import { FileUploader } from "@/components/shared/FileUploader";
import Flex from "@/components/shared/Flex";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createResourceAction } from "@/lib/actions/subject.action";
import paths from "@/lib/paths";
import {
  IClientFile,
  clientFileSchema,
  submitFileSchema,
} from "@/lib/schemas/file.schema";
import { ICreateResourceBody } from "@/lib/schemas/subject.schema";
import { UploadFolderName, UploadModuleName } from "@/lib/services/file/type";
import { ILanguage, ISubject } from "@/lib/services/subject/type";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type ClientFormProps = Omit<ICreateResourceBody, "files"> & {
  files: IClientFile[];
};

const CreateResourceForm = ({
  subjectList = [],
  languageList = [],
}: {
  subjectList?: ISubject[];
  languageList?: ILanguage[];
}) => {
  const { handleSubmit, control, reset } = useForm<ClientFormProps>({
    defaultValues: {
      title: "",
      comment: "",
    },
  });

  const { mutate: createResource, isPending } = useMutation({
    mutationFn: async (body: ICreateResourceBody) =>
      createResourceAction({ body }),
  });

  const handleCreateResource = async (data: ClientFormProps) => {
    const parsedData: ICreateResourceBody = {
      ...data,
      files: data?.files?.map((f) => submitFileSchema.parse(f)),
    };
    createResource(parsedData, {
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
    });
  };

  const handleClearForm = () => {
    reset({
      title: "",
      comment: "",
      subject_id: undefined,
      language: [],
    });
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(handleCreateResource)}>
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

          <Controller
            name="files"
            control={control}
            render={({ field }) => (
              <FileUploader<IClientFile>
                transformerSchema={clientFileSchema}
                files={field.value || []}
                setFiles={field.onChange}
                moduleName={UploadModuleName.StudyResources}
                folder={UploadFolderName.ResourcesBase}
              />
            )}
          />
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

export default CreateResourceForm;
