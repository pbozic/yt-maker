"use client"
import type { FormSchema } from "./FileUploadDialog";
import type { UseFormReturn } from "react-hook-form";

import type { Option } from "./FileUploadDialog"
import { useState } from "react";
import CreatableSelect   from 'react-select/creatable';
import { api } from "~/trpc/react";

interface MultiSelectProps {
    form: UseFormReturn<FormSchema>;
    tags: Option[];
}
interface MultiselectOption {
    value: string;
    label: string;
}
export const MultiSelect = ({tags, form} : MultiSelectProps) => {
  //TODO:
  // 1. Get all tags from apiapi.tag.getAll.useQuery()  
    const utils = api.useUtils();
    console.log("tags", tags)
    const [isCreating, setIsCreating] = useState(false);
    const [value, setValue] = useState<MultiselectOption[]>([]);
    const [inOptions, setInOptions] = useState<MultiselectOption[]>(tags.map((t) => {
      return {
        value: t.id,
        label: t.name,
      }
    }));
    console.log("inOptions", inOptions)
    const createTag = api.tag.create.useMutation();
    const handleCreate = async (inputValue: string) => {
      setIsCreating(true);
      const newOption = {
        id: inputValue.toLowerCase(),
        name: inputValue,
      };
      const {tag} = await createTag.mutateAsync(newOption)
      console.log(newOption)
      setValue((prev) => [...prev, {value: tag.id, label: tag.name}])
      setInOptions((prev) => [...prev, {value: tag.id, label: tag.name}])
      form.setValue("tags", [...form.getValues("tags"), tag.id])
      void utils.tag.getAll.invalidate();
      setIsCreating(false);
    }

    return <CreatableSelect  
      isMulti 
      value={value}
      options={inOptions}
      onCreateOption={handleCreate}
      isValidNewOption={(option) => option.length > 2}
      isLoading={isCreating}
      allowCreateWhileLoading={false}
      onChange={(newValue) => {
        form.setValue("tags", newValue.map((option) => option.value));
        setValue(Array.from(newValue).map((option) =>{
          return {
            value: option.value,
            label: option.label,
          }
        }))
      }
    }
    />
}