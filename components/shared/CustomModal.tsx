"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SearchParams } from "@/lib/const";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useCallback } from "react";

interface CustomModalProps {
  modalKey: string;
  title?: string;
  description?: string;
  children: ReactNode;
}

export function CustomModal({
  modalKey,
  title,
  description,
  children,
}: CustomModalProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const isOpen = searchParams.get(SearchParams.Modal) === modalKey;

  const onClose = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(SearchParams.Modal);

    router.replace(
      params.toString() ? `${pathname}?${params.toString()}` : pathname,
      { scroll: false },
    );
  }, [searchParams, pathname, router]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        {children}
      </DialogContent>
    </Dialog>
  );
}
