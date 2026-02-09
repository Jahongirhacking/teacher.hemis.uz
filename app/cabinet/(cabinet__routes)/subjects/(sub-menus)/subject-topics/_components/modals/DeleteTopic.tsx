/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Flex from "@/components/shared/Flex";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { deleteSubjectTopicItemAction } from "@/lib/actions/subject.action";
import { ModalKeys } from "@/lib/const";
import { FetchResult } from "@/lib/services/api";
import { IBaseDataRes } from "@/lib/services/type";
import { useMutation } from "@tanstack/react-query";
import { Loader, Trash2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const DeleteTopicModal = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { mutate: deleteTopic, isPending } = useMutation({
    mutationFn: async (
      topicId: string | number,
    ): Promise<FetchResult<IBaseDataRes<void>>> =>
      deleteSubjectTopicItemAction({ params: { topicId } }) as any,
  });

  const handleCloseModal = () => {
    router.replace(`${pathname}`);
  };

  const handleDeleteTopic = async () => {
    try {
      const topicId = searchParams.get(ModalKeys.TopicId);
      if (!topicId) return;
      deleteTopic(topicId, {
        onSuccess: (res) => {
          toast.dismiss();
          if (!res?.success) {
            toast.error(
              res?.error?.message || "O'chirishda xatolik qaytadan urining!",
            );
            return;
          }
          toast.success(res?.data?.message);
          handleCloseModal();
        },
        onError: () => {
          toast.dismiss();
          toast.error("O'chirishda xatolik");
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal modalKey={ModalKeys.DeleteTopic}>
      <Flex vertical gap={6} align="center">
        <span className="bg-[var(--destructive)] p-[14px] rounded-[8px]">
          <Trash2 className="text-white" />
        </span>
        <Flex vertical gap={2} align="center">
          <h3 className="text-[18px] font-bold text-[var(--card-foreground)]">
            O’chirishni tasdiqlash
          </h3>
          <p className="text-[var(--secondary-foreground)] font-medium">
            Faylni o’chirishni tasdiqlaysizmi?
          </p>
        </Flex>
        <Flex gap={2} className="flex-wrap">
          <Button variant={"secondary"} onClick={handleCloseModal}>
            Bekor qilish
          </Button>
          <Button
            onClick={handleDeleteTopic}
            variant={"destructive"}
            disabled={isPending}
          >
            {isPending && <Loader className="animate-spin" />} Ha,
            o&apos;chiraman
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default DeleteTopicModal;
