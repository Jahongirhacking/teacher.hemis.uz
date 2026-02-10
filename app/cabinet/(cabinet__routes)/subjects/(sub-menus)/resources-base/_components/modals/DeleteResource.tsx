/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Flex from "@/components/shared/Flex";
import useModal from "@/components/shared/hooks/useModal";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { deleteResourceItemAction } from "@/lib/actions/subject.action";
import { ModalKeys } from "@/lib/const";
import { FetchResult } from "@/lib/services/api";
import { IBaseDataRes } from "@/lib/services/type";
import { useMutation } from "@tanstack/react-query";
import { Loader, Trash2 } from "lucide-react";

const DeleteResourceModal = () => {
  const { mutate: deleteResource, isPending } = useMutation({
    mutationFn: async (
      resourceId: string | number,
    ): Promise<FetchResult<IBaseDataRes<void>>> =>
      deleteResourceItemAction({ params: { resourceId } }) as any,
  });
  const { handleCloseModal, handleDelete } = useModal({
    onDelete: deleteResource,
  });

  return (
    <Modal modalKey={ModalKeys.DeleteResource}>
      <Flex vertical gap={6} align="center">
        <span className="bg-[var(--destructive)] p-[14px] rounded-[8px]">
          <Trash2 className="text-white" />
        </span>
        <Flex vertical gap={2} align="center">
          <h3 className="text-[18px] font-bold text-[var(--card-foreground)]">
            O’chirishni tasdiqlash
          </h3>
          <p className="text-[var(--secondary-foreground)] font-medium">
            Resursni o’chirishni tasdiqlaysizmi?
          </p>
        </Flex>
        <Flex gap={2} className="flex-wrap">
          <Button variant={"secondary"} onClick={handleCloseModal}>
            Bekor qilish
          </Button>
          <Button
            onClick={handleDelete}
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

export default DeleteResourceModal;
