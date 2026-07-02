import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Highlight } from "@/lib/types";

  open: boolean;
  onAddHighlight: (highlight: Omit<Highl
}

  const [meta, setMeta] = useState
  const [url, se
  const [errors, setEr
  useEffect(() => {
      setTitle(editHighlight.title 
 

    } else if (open && !editHighlight) {
    }
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

      return;

      title: tit
      description: desc
      displayOr

  };
  re

          onClick={handleClos
        >
          <spa


          </DialogTitle>


              Title <spa
            <Input
     
              className
            />
     
          <div>
              Meta Text <span className="text-destructiv
     
              value={meta}
              className="mt-1.5 text-sm h-
            />
     

              Description
            <Textarea
    

            />
          </div>
          <di
     

              value=
              className="m
            />

            <Label htmlFor="display
            </Label>
       

              onCh
    

        </
        <div className="flex gap-3 justify-end pt-4
            Cancel
          <Butt
          </Button>
      </DialogContent>
  );































































































