import { getSignedUrl as gsu } from "@aws-sdk/s3-request-presigner"
import {
    S3,
    ListObjectsCommand,
    PutObjectCommand,
    GetObjectCommand
} from "@aws-sdk/client-s3";

const AWS_BUCKET = process.env.AWS_BUCKET!;
const s3 = new S3({
    endpoint: "https://s3.tebi.io",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    region: "global"
});

export const postSignedUrl = async ({fileKey: key, fileType: type}: {fileKey: string, fileType: string}) => {
    const fileParams = {
        ACL: undefined, // Set ACL to undefined
        Bucket: AWS_BUCKET,
        Key: key,
        ContentType: type
      }
      const command = new PutObjectCommand(fileParams);
      const url = await gsu(s3, command, { expiresIn: 3600 });
      return url
}

export const getSignedUrl = async ({fileKey: key, fileType: type}: {fileKey: string, fileType: string}) => {
  const fileParams = {
      ACL: undefined, // Set ACL to undefined
      Bucket: AWS_BUCKET,
      Key: key,
    }
    const command = new GetObjectCommand(fileParams);
    const url = await gsu(s3, command, { expiresIn: 3600 });
    return url
}
export const GetObject = async ({key}: {key: string}) => {
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET,
      Key: key,
    });
  
    try {
      const response = await s3.send(command);
      // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
      const str = await response?.Body?.transformToString();
      return str
      console.log("getObject", str);
    } catch (err) {
      console.error(err);
      return ""
    }
  };