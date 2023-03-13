import * as fsPromises from 'fs/promises';
import { join, resolve } from 'path';

export const dirIsExists = async (path: string): Promise<boolean> => {
  try {
    await fsPromises.access(path);
    return true;
  } catch {
    return false;
  }
};

export const fileIsExists = dirIsExists;

export const makeDir = async (path: string): Promise<void> => {
  const absPath = resolve(path);
  const isExists = await dirIsExists(absPath);
  if (isExists) {
    return;
  }
  await fsPromises.mkdir(absPath);
};

export async function getFiles(path: string): Promise<string[]> {
  return await fsPromises.readdir(path);
}

export const deleteDirFiles = async (path: string): Promise<string[]> => {
  const files = await getFiles(path);
  return await Promise.all(
    files.map(async (file) => {
      const filePath = join(path, file);
      await fsPromises.unlink(filePath);
      return filePath;
    }),
  );
};

export const deleteFile = async (path: string): Promise<void> => {
  const absPath = resolve(path);
  await fsPromises.unlink(absPath);
};

export const deleteDir = async (path: string): Promise<void> => {
  const absPath = resolve(path);
  await fsPromises.rm(absPath, { recursive: true, force: true });
};
