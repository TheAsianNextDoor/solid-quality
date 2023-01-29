import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dayjs from 'dayjs';

import { serverEnv } from '~/env/server';

const accessKeyId = serverEnv.AWS_ACCESS_KEY_ID;
const secretAccessKey = serverEnv.AWS_SECRET_ACCESS_KEY;
const Bucket = serverEnv.AWS_S3_BUCKET;

const signingDate = dayjs().startOf('day').toDate();
const expiresIn = 60 * 60 * 24 * 2;

const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const generatePreSignedPutUrl = async (pathToFileArray: string[]) => {
  if (!pathToFileArray || !pathToFileArray.length) {
    return [];
  }

  const urlArray = [];

  try {
    for (let i = 0; i < pathToFileArray.length; i += 1) {
      const filePath = pathToFileArray[i];

      const command = new PutObjectCommand({
        Bucket,
        Key: filePath,
      });

      // eslint-disable-next-line no-await-in-loop
      const url = await getSignedUrl(s3Client, command);

      urlArray[i] = url;
    }
  } catch (e) {
    console.error(e);
  }

  return urlArray;
};

const generatePreSignedGetUrl = async (pathToFileArray: string[]) => {
  if (!pathToFileArray || !pathToFileArray.length) {
    return [];
  }

  const urlArray = [];

  try {
    for (let i = 0; i < pathToFileArray.length; i += 1) {
      const filePath = pathToFileArray[i];

      const command = new GetObjectCommand({
        Bucket,
        Key: filePath,
      });

      // eslint-disable-next-line no-await-in-loop
      const url = await getSignedUrl(s3Client, command, {
        expiresIn,
        signingDate,
      });

      urlArray[i] = url;
    }
  } catch (e) {
    console.error(e);
  }

  return urlArray;
};

const getObjectsFromFolder = async (folderPath: string) => {
  const data = await s3Client.send(new ListObjectsV2Command({ Bucket, Prefix: folderPath }));

  return data;
};

const generatePreSignedGetUrlFromFolder = async (folderPath: string) => {
  const data = await getObjectsFromFolder(folderPath);

  const pathsToFiles = data?.Contents?.map((file) => file.Key) as string[];

  return generatePreSignedGetUrl(pathsToFiles);
};

const deleteObject = async (filePath: string) => {
  const data = await s3Client.send(new DeleteObjectCommand({ Bucket, Key: filePath }));

  return data;
};

export const AWS_SDK = {
  s3: {
    deleteObject,
    getObjectsFromFolder,
    generatePreSignedGetUrl,
    generatePreSignedPutUrl,
    generatePreSignedGetUrlFromFolder,
  },
};
