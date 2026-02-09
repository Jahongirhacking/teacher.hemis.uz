"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useMemo } from "react";

interface ModalProps {
  /** Controlled props (optional) */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  /** URL based modal */
  modalKey?: string;

  title?: ReactNode;
  children?: ReactNode;

  okText?: string;
  cancelText?: string;

  onOk?: () => void;
  onCancel?: () => void;
  footer?: boolean;

  loading?: boolean;
  className?: string;
}

export default function Modal({
  open,
  onOpenChange,
  modalKey,

  title,
  children,

  okText = "OK",
  cancelText = "Cancel",

  onOk,
  onCancel,
  footer,

  loading = false,
  className,
}: ModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isControlled = open !== undefined && onOpenChange !== undefined;

  const urlOpen = useMemo(() => {
    if (!modalKey) return false;
    return searchParams.get("active-modal") === modalKey;
  }, [searchParams, modalKey]);

  const actualOpen = isControlled ? open : urlOpen;

  const setOpen = (value: boolean) => {
    if (isControlled) {
      onOpenChange?.(value);
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("active-modal", modalKey!);
    } else {
      params.delete("active-modal");
    }

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
  };

  return (
    <Dialog open={actualOpen} onOpenChange={setOpen}>
      <DialogTitle />
      <DialogContent className={cn("sm:max-w-[520px]", className)}>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}

        <div className="py-2">{children}</div>

        {footer && (
          <DialogFooter className="gap-2">
            <Button
              variant="secondary"
              onClick={handleCancel}
              disabled={loading}
            >
              {cancelText}
            </Button>
            <Button onClick={onOk} disabled={loading}>
              {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              {okText}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
