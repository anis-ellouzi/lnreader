import { getBatteryLevelSync } from 'react-native-device-info';
import { useBatteryLevel } from 'react-native-device-info';

export const BATTERY_LEVEL = __DEV__ ? 100 : getBatteryLevelSync;

export function getBatteryLevel(): number {
  return __DEV__ ? 100 : getBatteryLevelSync();
}
