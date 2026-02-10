"use client";

import CustomSelect from "@/components/shared/CustomSelect";
import Flex from "@/components/shared/Flex";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import paths from "@/lib/paths";
import { IBaseName, ILanguage, ISubject } from "@/lib/services/subject/type";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

const CreateTaskForm = ({
  taskTypes = [],
  languageList = [],
  subjectList = [],
}: {
  taskTypes?: IBaseName[];
  languageList?: ILanguage[];
  subjectList?: ISubject[];
}) => {
  const { handleSubmit, control } = useForm();

  const handleCreateTask = (data: object) => {
    console.log(data);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(handleCreateTask)}>
      <Flex gap={4} className="flex-col lg:flex-row w-full">
        <Card className="w-full p-0">
          <Flex vertical className="w-full">
            <h3 className="p-4 font-bold text-[18px]">Asosiy ma’lumot</h3>
            <Separator />
            <Flex gap={4} vertical align="center" className="p-4 w-full">
              <Flex gap={2} align="center" className="w-full">
                <label className="w-full flex flex-col gap-2 text-[var(--card-foreground)] text-[14px]">
                  Topshiriq turi
                  <Controller
                    name="_exam_type"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        showSearch
                        allowClear
                        className="w-full"
                        options={taskTypes?.map((o) => ({
                          label: o?.name,
                          value: o?.code,
                        }))}
                        placeholder="Topshiriq turini tanlang"
                        value={field?.value}
                        onValueChange={field?.onChange}
                      />
                    )}
                  />
                </label>
                <label className="flex flex-col gap-2 text-[var(--card-foreground)] text-[14px]">
                  Til
                  <Controller
                    name="_language"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        showSearch
                        allowClear
                        className="w-full"
                        options={languageList?.map((l) => ({
                          label: l?.name,
                          value: l?.code,
                        }))}
                        placeholder="Tilni tanlang"
                        value={field?.value}
                        onValueChange={field?.onChange}
                      />
                    )}
                  />
                </label>
              </Flex>
              <label className="w-full flex flex-col gap-2 text-[var(--card-foreground)] text-[14px]">
                Topshiriq nomi
                <Controller
                  name="_task_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      className="w-full"
                      placeholder="Topshiriq nomini kiriting"
                      {...field}
                    />
                  )}
                />
              </label>
              <Flex gap={2} align="center" className="w-full">
                <label className="w-full flex flex-col gap-2 text-[var(--card-foreground)] text-[14px]">
                  Fan
                  <Controller
                    name="_subject_name"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        showSearch
                        allowClear
                        className="w-full"
                        options={subjectList?.map((l) => ({
                          label: l?.name,
                          value: l?.code,
                        }))}
                        placeholder="Fanni tanlang"
                        value={field?.value}
                        onValueChange={field?.onChange}
                      />
                    )}
                  />
                </label>
                <label className="w-full flex flex-col gap-2 text-[var(--card-foreground)] text-[14px]">
                  Status
                  <Controller
                    name="_status"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        showSearch
                        allowClear
                        className="w-full"
                        options={[]}
                        placeholder="Statusni tanlang"
                        value={field?.value}
                        onValueChange={field?.onChange}
                      />
                    )}
                  />
                </label>
              </Flex>
            </Flex>
          </Flex>
        </Card>

        <Card className="w-full p-0">
          <Flex vertical>
            <h3 className="p-4 font-bold text-[18px]">Qo’shimcha ma’lumot</h3>
            <Separator />
            <Flex gap={4} vertical align="center" className="p-4 w-full">
              <label className="w-full flex flex-col gap-2 text-[var(--card-foreground)] text-[14px]">
                Izoh
                <Controller
                  name="_comment"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      className="w-full"
                      placeholder="Izoh qoldirish"
                      {...field}
                    />
                  )}
                />
              </label>
              <label className="w-full flex flex-col gap-2 text-[var(--card-foreground)] text-[14px]">
                URL
                <Controller
                  name="_url"
                  control={control}
                  render={({ field }) => (
                    <Input
                      className="w-full"
                      placeholder="https://"
                      {...field}
                    />
                  )}
                />
              </label>
              <Flex gap={2} justify="end" className="w-full">
                <Link href={paths.private.subjects.tasksBase}>
                  <Button type="button" variant="secondary">
                    Bekor qilish
                  </Button>
                </Link>
                <Button type="submit">Saqlash</Button>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </form>
  );
};

export default CreateTaskForm;
