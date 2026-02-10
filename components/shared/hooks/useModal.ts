/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ModalKeys, SearchParams } from "@/lib/const";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const useModal = ({
  onDelete,
}: {
  onDelete: (id: string | number, options: any) => void;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleDelete = async () => {
    try {
      const resourceId = searchParams.get(ModalKeys.ModalId);
      if (!resourceId) return;
      onDelete(resourceId, {
        onSuccess: (res) => {
          toast.dismiss();
          if (!res?.success) {
            toast.error(
              res?.error?.message || "O'chirishda xatolik qaytadan urining!",
            );
            return;
          }
          toast.success(res?.data?.message || "Muvaffaqiyatli o'chirildi");
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

  const handleCloseModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(ModalKeys.ModalId);
    params.delete(SearchParams.Modal);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return {
    handleCloseModal,
    handleDelete,
  };
};

export default useModal;
