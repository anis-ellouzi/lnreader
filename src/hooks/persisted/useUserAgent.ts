import { MMKVStorage } from '@utils/mmkv/mmkv';
import { useMMKVString } from '@utils/mmkv/mmkv';
import { getUserAgentSync } from 'react-native-device-info';

export const USER_AGENT = 'USER_AGENT';

export const getUserAgent = () => {
  const user = __DEV__
    ? 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    : getUserAgentSync();
  return MMKVStorage.getString(USER_AGENT) || user;
};

export default function useUserAgent() {
  const user = __DEV__
    ? 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    : getUserAgentSync();
  const [userAgent = user, setUserAgent] = useMMKVString(USER_AGENT);

  return {
    userAgent,
    setUserAgent,
  };
}
