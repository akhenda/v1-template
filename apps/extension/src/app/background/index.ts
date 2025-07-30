import { defineBackground } from '#imports';
import { getStorage, StorageKey } from '@/lib/storage';
import { logger } from '@/lib/utils';
import { Message, onMessage } from '~/lib/messaging';

const main = () => {
  logger.info(
    'Background service worker is running! Edit `src/app/background` and save to reload.',
  );
};

onMessage(Message.USER, () => {
  const storage = getStorage(StorageKey.USER);

  return storage.getValue();
});

export default defineBackground(main);
