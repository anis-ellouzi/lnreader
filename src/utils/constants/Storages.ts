import FileManager from '@native/FileManager';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import * as FileSystem from 'expo-file-system';

export function getRootPath(): string {
  const root = FileSystem.documentDirectory; //FOR iOS
  //return root ?? '';
  return '';
}
export function getPluginPath(): string {
  return getRootPath() + '/Plugins';
}

export function getNovelPath(): string {
  return getRootPath() + '/Novels';
}
export const ASSETS_URI_PREFIX = __DEV__
  ? 'http://localhost:8081/assets'
  : 'file:///android_asset';
export const ROOT_STORAGE = getRootPath();
export const PLUGIN_STORAGE = getPluginPath();
export const NOVEL_STORAGE = getNovelPath();
