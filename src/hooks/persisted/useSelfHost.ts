import { useMMKVString } from '@utils/mmkv/mmkv';

export const SELF_HOST_BACKUP = 'SELF_HOST_BACKUP';

export const useSelfHost = () => {
  const [host = '', setHost] = useMMKVString(SELF_HOST_BACKUP);
  return {
    host,
    setHost,
  };
};
