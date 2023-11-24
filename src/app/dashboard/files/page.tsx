import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "~/trpc/server";
import FileUploadDialog from "./components/FileUploadDialog";
import {DataTable} from "./components/Table";

export default async function Files() {
  const { files } = await api.file.getAll.query();
  console.log("files out", files);
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
                    {/* <FileUploadDialog /> */}
                  </div>
                </div>
                </CardTitle>
              <CardDescription>List of all media files</CardDescription>
            </CardHeader>
            <CardContent>
              {files && <DataTable data={files} />}
  
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
