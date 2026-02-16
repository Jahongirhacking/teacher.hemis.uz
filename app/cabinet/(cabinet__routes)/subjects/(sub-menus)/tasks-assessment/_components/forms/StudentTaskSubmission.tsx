/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Empty from "@/components/shared/Empty";
import Flex from "@/components/shared/Flex";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { gradeTaskSubmissionAction } from "@/lib/actions/subject.action";
import { ISubmitFile } from "@/lib/schemas/file.schema";
import { IGradeTaskSubmissionBody } from "@/lib/schemas/subject.schema";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const StudentTaskSubmissionForm = ({
  taskName,
  answerComment,
  files,
  submissionId,
  resultsPath,
}: {
  taskName: string;
  answerComment: string;
  files: ISubmitFile[];
  resultsPath?: string;
  submissionId: string;
}) => {
  const { control, handleSubmit } = useForm<IGradeTaskSubmissionBody>();
  const pathname = usePathname();
  const router = useRouter();
  const prevPath =
    resultsPath || `${pathname?.split("/")?.slice(0, -2)?.join("/")}`;

  const { mutateAsync: gradeSubmission, isPending } = useMutation({
    mutationFn: gradeTaskSubmissionAction,
  });

  const handleGradeSubmission = async (data: IGradeTaskSubmissionBody) => {
    try {
      if (isPending) return;
      const res = await gradeSubmission({
        params: { submissionId },
        body: data,
      });
      if (res?.success) {
        toast.success("Muvaffaqiyatli baholandi!");
        router.replace(prevPath);
      } else {
        throw new Error(res?.error?.message || "Baholashda xatolik");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(handleGradeSubmission)}>
      <Flex gap={4} className="w-full flex-col md:flex-row">
        <Card className="w-full flex-1 gap-4">
          <CardHeader className="gap-0">
            <h2 className="text-[18px] font-bold">Javob</h2>
          </CardHeader>
          <Separator />

          <Flex vertical gap={6} className="py-2 px-4 w-full">
            <label className="flex flex-col gap-2 w-full">
              Tapshiriq nomi
              <Input disabled value={taskName} placeholder="Topshiriq nomi" />
            </label>

            <label className="flex flex-col gap-2 w-full">
              Topshiriqning javob izohi
              <Input disabled value={answerComment} placeholder="Izoh" />
            </label>

            <Flex vertical gap={2} className="w-full">
              <span>Fayllar</span>
              {files?.length ? (
                <ul>
                  {files?.map((f) => (
                    <span key={f?.url}>{f?.name}</span>
                  ))}
                </ul>
              ) : (
                <Empty className="m-auto" />
              )}
            </Flex>
          </Flex>
        </Card>

        <Card className="w-full flex-1 gap-4">
          <CardHeader className="gap-0">
            <h2 className="text-[18px] font-bold">Baholash</h2>
          </CardHeader>
          <Separator />

          <Flex vertical gap={6} className="py-2 px-4 w-full">
            <label className="flex flex-col gap-2 w-full">
              Tapshiriq balli
              <Controller
                control={control}
                name="ball"
                render={({ field }) => (
                  <Input type="number" placeholder="Ball" {...field} />
                )}
              />
            </label>

            <label className="flex flex-col gap-2 w-full">
              Baholash izohi
              <Controller
                control={control}
                name="comment"
                render={({ field }) => (
                  <Textarea placeholder="Izoh qoldirish" {...field} />
                )}
              />
            </label>

            <Flex gap={2} className="flex-wrap ml-auto">
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.replace(prevPath)}
              >
                Bekor qilish
              </Button>
              <Button disabled={isPending} type="submit">
                {isPending && <Loader className="animate-spin" />} Saqlash
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </form>
  );
};

export default StudentTaskSubmissionForm;
