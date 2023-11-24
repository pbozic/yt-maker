"use client"
import { Dialog, DialogHeader, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import * as z from "zod"
import { PlusIcon } from "@heroicons/react/24/solid"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import { MultiSelect } from "./Multiselect";
import { format } from "date-fns";
import { useState } from "react";
import LoadingSpinner from "../../../_components/Loader"
export const UploadFileQuery = z.object({
  name: z.string().min(2),
  file:  z.string(),
  tags: z.array(z.string()),
})
export type FormSchema = z.infer<typeof UploadFileQuery>

export interface Option {
  id: string;
  name: string;
}

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async function () {
      const sha256 = (await hashValue(reader?.result as string))
      if (typeof sha256 !== "string") return reject("error");
      return resolve(sha256.toString());
    };
    reader.onerror = function (error) {
      return reject(error);
    };
  });
}
const hashValue = (val: string) => {
  return new Promise((resolve, reject) => {
    crypto.subtle
      .digest('SHA-256', new TextEncoder().encode(val))
      .then(h => {
        const hexes = [],
          view = new DataView(h);
        for (let i = 0; i < view.byteLength; i += 4)
          hexes.push(('00000000' + view.getUint32(i).toString(16)).slice(-8));
         return resolve(hexes.join(''));
      }).catch((error) => {
         return reject(error)
      });
  
  });
}


// eslint-disable-next-line @typescript-eslint/require-await
export default function FileUploadDialog() {
    const [file, setFile] = useState<File | undefined>(undefined)
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const {data, isLoading} = api.tag.getAll.useQuery();
    const createFile = api.file.create.useMutation();
    const updateFile = api.file.updateAfterAWS.useMutation();
    const utils = api.useUtils();
    const form = useForm<FormSchema>({
      resolver: zodResolver(UploadFileQuery),
      defaultValues: {
          name: "",
          tags: [],
          file: undefined,
      }
})


    if (isLoading) return null;
    if (!data || data.tags.length === 0) return null;

  
    async function onSubmit(data: FormSchema) {
        setIsCreating(true)
        console.log(data);
        console.log("file", file)
        if (!file) return setIsCreating(false);
        const extension = `${file.name.substring(
          file.name.lastIndexOf(".") + 1,
          file.name.length
        ) || file.name}`
        const date = new Date();
        const formattedDate = format(date, "yyyyMMddHHmmss");
        let sha256 = "";
        try {
          sha256 = await getBase64(file) as string;
        } catch (error) {
          setIsCreating(false)
          return "Something wrong with file"
        }
       
        const fileKey = `${formattedDate}_${sha256}.${extension}`;
     
        const fileInfo = {
          name: data.name,
          tags: data.tags,
          fileKey,
          fileType: file.type,
          fileName: file.name
        }
        const {id, url} = await createFile.mutateAsync(fileInfo)
        console.log(id);
        if (!id) return setIsCreating(false);
        const formData = new FormData()
        formData.append('file', file)
        
        const post = await fetch(url, {
          method: "PUT",
          body: file,
        })
        if (post.ok) {
          void updateFile.mutate(id)
        }
        setIsCreating(false)
        console.log("url", url)
        void utils.file.getAll.invalidate();
      
       
    }
    return (
      <Dialog onOpenChange={() => form.reset()}>
        <DialogTrigger asChild>
            <Button variant="outline" size="sm">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add new file
            </Button>
        </DialogTrigger>
        
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Upload file</DialogTitle>
                <DialogDescription>Upload a media file with tags</DialogDescription>
                <DialogClose />
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>File Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>This is the file name that will appear in the application.</FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                 
                    <FormField
                        control={form.control}
                        name="file"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>File</FormLabel>
                            <FormControl>
                                <Input type="file" {...field} onChange={(e) => {
                                  e.preventDefault();
                                  if (e?.target?.files?.length) {
                                    setFile(e?.target?.files?.length ? e.target.files[0] : undefined);
                                    field.onChange(e)
                                  }
                                 
                                }}/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                      control={form.control}
                      name="tags"
                      render={() => (
                        <FormItem>
                          <FormLabel>Tags</FormLabel>
                          <MultiSelect tags={data.tags} form={form}></MultiSelect>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center justify-end space-x-4">
                      <DialogClose asChild>
                          <Button variant={"outline"} size="sm" onClick={() => {
                              
                              form.reset()
                            }}>
                              Cancel
                          </Button>
                      </DialogClose>
                      <Button className="flex" variant={"default"} size="sm" type="submit">
                        {!isCreating && "Upload file"}
                        {isCreating && <div className="flex flex-row">Creating <LoadingSpinner /></div>}
                      </Button>
                    </div>
                </form>
                
            </Form>
        </DialogContent>
      </Dialog>
    );
  }