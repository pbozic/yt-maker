"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "~/trpc/react";
import FileUploadDialog from "./components/FileUploadDialog";
import {DataTable} from "./components/Table";

export default function Files() {
  const { data, isLoading } = api.file.getAll.useQuery();
  console.log("files out", data);
    return (
      <div className="flex w-full text-black">
        <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center justify-between">
                  <div className="title">
                    Files
                  </div>
                  <div className="button">
                    <FileUploadDialog />
                  </div>
                </div>
                </CardTitle>
              <CardDescription>List of all media files</CardDescription>
            </CardHeader>
            <CardContent>
              {data?.files && <DataTable data={data.files} />}
  
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
