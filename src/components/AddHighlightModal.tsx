import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Highlight } from "@/lib/types";
import { X } from "@phosphor-icons/react";

interface AddHighlightModalProps {
  open: boolean;
  onClose: () => void;
  onAddHighlight: (highlight: Omit<Highlight, 'id'>) => void;
  editHighlight?: Highlight | null;
}

export const AddHighlightModal = ({ open, onClose, onAddHighlight, editHighlight }: AddHighlightModalProps) => {
  const [title, setTitle] = useState("");
  const [meta, setMeta] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState("1");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open && editHighlight) {
      setTitle(editHighlight.title || "");
      setMeta(editHighlight.meta || "");
      setDescription(editHighlight.description || "");
      setUrl(editHighlight.url || "");
      setDisplayOrder(String(editHighlight.displayOrder || 1));
      setErrors({});
    } else if (open && !editHighlight) {
      resetForm();
    }
  }, [open, editHighlight]);

  const resetForm = () => {
    setTitle("");
    setMeta("");
    setDescription("");
    setUrl("");
    setDisplayOrder("1");
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!meta.trim()) {
      newErrors.meta = "Meta text is required";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required";
    }
    const orderNum = parseInt(displayOrder);
    if (isNaN(orderNum) || orderNum < 1) {
      newErrors.displayOrder = "Display order must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    onAddHighlight({
      title: title.trim(),
      meta: meta.trim(),
      description: description.trim(),
      url: url.trim() || undefined,
      displayOrder: parseInt(displayOrder),
    });

    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[580px] max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10"
        >
          <X size={20} weight="bold" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader>
          <DialogTitle className="text-xl font-semibold pr-8">
            {editHighlight ? "Edit Highlight" : "Add Highlight"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div>
            <Label htmlFor="title" className="text-sm font-semibold">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1.5 text-sm h-10"
              placeholder="Enter title"
            />
            {errors.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}
          </div>

          <div>
            <Label htmlFor="meta" className="text-sm font-semibold">
              Meta Text <span className="text-destructive">*</span>
            </Label>
            <Input
              id="meta"
              value={meta}
              onChange={(e) => setMeta(e.target.value)}
              className="mt-1.5 text-sm h-10"
              placeholder="Enter meta text"
            />
            {errors.meta && <p className="text-xs text-destructive mt-1">{errors.meta}</p>}
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-semibold">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1.5 text-sm min-h-[100px]"
              placeholder="Enter description"
            />
            {errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
          </div>

          <div>
            <Label htmlFor="url" className="text-sm font-semibold">
              URL
            </Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1.5 text-sm h-10"
              placeholder="https://..."
            />
          </div>

          <div>
            <Label htmlFor="displayOrder" className="text-sm font-semibold">
              Display Order <span className="text-destructive">*</span>
            </Label>
            <Input
              id="displayOrder"
              type="number"
              min="1"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(e.target.value)}
              className="mt-1.5 text-sm h-10"
              placeholder="1"
            />
            {errors.displayOrder && <p className="text-xs text-destructive mt-1">{errors.displayOrder}</p>}
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Button variant="outline" onClick={handleClose} className="text-sm h-10 px-5">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm h-10 px-5">
            {editHighlight ? "Update Highlight" : "Add Highlight"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
