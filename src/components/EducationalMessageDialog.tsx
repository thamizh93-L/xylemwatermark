
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface EducationalMessageDialogProps {
  open: boolean;
  message: string | null;
  onOk: () => void;
}

const EducationalMessageDialog = ({ open, message, onOk }: EducationalMessageDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-md mx-auto text-center p-6 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg text-primary mb-2">Waste Sorting Tip</DialogTitle>
        </DialogHeader>
        <div className="my-4 text-base text-gray-700 min-h-[48px] flex items-center justify-center">{message}</div>
        <DialogFooter>
          <Button autoFocus className="mx-auto w-full mt-4" onClick={onOk}>
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EducationalMessageDialog;
