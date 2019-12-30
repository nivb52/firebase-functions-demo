import * as functions from "firebase-functions";
import {Storage} from "@google-cloud/storage";
const gcs = new Storage();

import * as fs from "fs-extra";
import { tmpdir } from "os";
import { join } from "path";
//@ts-ignore // Handle Image Resize 
import * as sharp from "sharp";

export const resizeAvatar = functions.storage
  .object() // info of the file
  .onFinalize(async object => {
    const bucket = gcs.bucket(object.bucket); // getting access to the file

    const filePath = object.name;
    if (!filePath) return 

    const fileName = filePath.split("/").pop();

    // @ts-ignore
    if (fileName.includes("avatar_")) {
      console.log("exiting - is it an avatar file");
      return false;
    }

    const tmpFilePath = join(tmpdir(), filePath);

    const avatarFileName = "avatar_" + fileName;
    const tmpAvatarPath = join(tmpdir(), avatarFileName);

    await bucket.file(filePath).download({
      destination: tmpFilePath
    });

    await sharp(tmpFilePath)
      .resize(150, 150)
      .toFile(tmpAvatarPath);

    return bucket.upload(tmpAvatarPath, {
      // @ts-ignore
      destination: join(dirname(filePath), avatarFileName)
    });
  });
