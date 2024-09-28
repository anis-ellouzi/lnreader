import { Alert, NativeModules } from 'react-native';
//import RNFS from 'react-native-fs';
import * as FileSystem from 'expo-file-system';
interface ReadDirResult {
  name: string;
  path: string;
  isDirectory: boolean; // int
}

interface FileManagerInterface {
  writeFile: (path: string, content: string) => Promise<void>;
  readFile: (path: string) => string;
  resolveExternalContentUri: (uriString: string) => Promise<string | null>;
  copyFile: (sourcePath: string, destPath: string) => Promise<void>;
  moveFile: (sourcePath: string, destPath: string) => Promise<void>;
  exists: (filePath: string) => Promise<boolean>;
  /**
   * @description create parents, and do nothing if exists;
   */
  mkdir: (filePath: string) => Promise<void>;
  /**
   * @description remove recursively
   */
  unlink: (filePath: string) => Promise<void>;
  readDir: (dirPath: string) => Promise<ReadDirResult[]>;
  pickFolder: () => Promise<string | null>;
  downloadFile: (
    url: string,
    destPath: string,
    method: string,
    headers: Record<string, string> | Headers,
    body?: string,
  ) => Promise<void>;
  ExternalDirectoryPath: string;
  ExternalCachesDirectoryPath: string;
  LibraryDirectoryPath: string;
}

//const { FileManagerd } = NativeModules;

//export FileManagerd as FileManagerInterface;
/*
export default class FileManager {
  ExternalDirectoryPath = RNFS.ExternalDirectoryPath;
  ExternalCachesDirectoryPath = RNFS.ExternalCachesDirectoryPath;
  LibraryDirectoryPath = RNFS.LibraryDirectoryPath;

  async writeFile(path: string, content: string): Promise<void> {
    await RNFS.writeFile(path, content, 'utf8');
  }

  async readFile(path: string): Promise<string> {
    return await RNFS.readFile(path, 'utf8');
  }

  async resolveExternalContentUri(uriString: string): Promise<string | null> {
    // Implement this based on your URI structure
    return uriString; // Placeholder implementation
  }

  async copyFile(sourcePath: string, destPath: string): Promise<void> {
    await RNFS.copyFile(sourcePath, destPath);
  }

  async moveFile(sourcePath: string, destPath: string): Promise<void> {
    await RNFS.moveFile(sourcePath, destPath);
  }

  async exists(filePath: string): Promise<boolean> {
    const exists = await RNFS.exists(filePath);
    return exists;
  }

  async mkdir(filePath: string): Promise<void> {
    await RNFS.mkdir(filePath);
  }

  async unlink(filePath: string): Promise<void> {
    await RNFS.unlink(filePath);
  }

  async readDir(dirPath: string): Promise<ReadDirResult[]> {
    const files = await RNFS.readDir(dirPath);
    return files.map(file => ({
      name: file.name,
      isDirectory: () => file.isDirectory(),
    }));
  }

  async pickFolder(): Promise<string | null> {
    // This typically requires a third-party library or custom implementation for folder picking
    return null; // Placeholder implementation
  }

  async downloadFile(
    url: string,
    destPath: string,
    method: string = 'GET',
    headers: Record<string, string> = {},
    body?: string,
  ): Promise<void> {
    const options = {
      fromUrl: url,
      toFile: destPath,
      headers: headers,
      background: true,
      // Add other options as needed
    };
    await RNFS.downloadFile(options).promise;
  }
}*/
export default class FileManager {
  ExternalDirectoryPath = FileSystem.documentDirectory; // Use document directory for app-specific files
  ExternalCachesDirectoryPath = FileSystem.cacheDirectory; // Cache directory for temporary files
  LibraryDirectoryPath = FileSystem.documentDirectory; // Library path (typically document directory)

  static async writeFile(path: string, content: string): Promise<void> {
    await FileSystem.writeAsStringAsync(path, content, {
      encoding: FileSystem.EncodingType.UTF8,
    });
  }

  static readFile(path: string): string {
    let result: string = '';
    const getObject = async () => {
      const object = await FileSystem.readAsStringAsync(path);
      result = object;
    };

    getObject();

    Alert.alert(path);
    Alert.alert(result);
    return result;
  }

  static async resolveExternalContentUri(
    uriString: string,
  ): Promise<string | null> {
    // Implement based on your URI structure
    return uriString; // Placeholder implementation
  }

  static async copyFile(sourcePath: string, destPath: string): Promise<void> {
    await FileSystem.copyAsync({ from: sourcePath, to: destPath });
  }

  static async moveFile(sourcePath: string, destPath: string): Promise<void> {
    await FileSystem.moveAsync({ from: sourcePath, to: destPath });
  }

  static async exists(filePath: string): Promise<boolean> {
    try {
      await FileSystem.getInfoAsync(filePath);
      return true;
    } catch {
      return false;
    }
  }

  static async mkdir(filePath: string): Promise<void> {
    await FileSystem.makeDirectoryAsync(filePath, { intermediates: true });
  }

  static async unlink(filePath: string): Promise<void> {
    await FileSystem.deleteAsync(filePath, { idempotent: true });
  }

  static async readDir(
    dirPath: string,
  ): Promise<{ name: string; isDirectory: () => boolean }[]> {
    const files = await FileSystem.readDirectoryAsync(dirPath);
    return files.map(name => ({
      name,
      isDirectory: () => false, // Adjust as needed, since this method does not return file types
    }));
  }

  static async pickFolder(): Promise<string | null> {
    // Folder picking typically requires a library like `expo-document-picker`
    return null; // Placeholder implementation
  }

  static async downloadFile(
    url: string,
    destPath: string,
    method: string = 'GET',
    headers: Record<string, string> = {},
    body?: string,
  ): Promise<void> {
    const response = await FileSystem.downloadAsync(url, destPath, {
      headers: headers,
    });
    return; // Handle response if necessary
  }
}
