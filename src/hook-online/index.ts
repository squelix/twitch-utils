import {
  DISCORD_WEBHOOK_ID,
  DISCORD_WEBHOOK_TOKEN,
  TWITCH_CLIENT_ID,
  TWITCH_CLIENT_SECRET,
  TWITCH_USER_ID,
} from '@config/env';
import { sendOnlineToDiscordWebhook } from '@hookOnline/discord';
import { initListener } from '@hookOnline/init-listener';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs().locale('fr');
dayjs.extend(localizedFormat);

const listener = initListener(TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET);

try {
  (async () => {
    await listener.listen();

    const onlineSubscription = await listener.subscribeToStreamOnlineEvents(TWITCH_USER_ID, async (event) => {
      const streamer = await event.getBroadcaster();
      const stream = await streamer.getStream();
      const game = await stream.getGame();

      await sendOnlineToDiscordWebhook(DISCORD_WEBHOOK_ID, DISCORD_WEBHOOK_TOKEN, {
        name: event.broadcasterName,
        displayName: event.broadcasterDisplayName,
        profilePicture: streamer.profilePictureUrl,
        game: game.name,
        viewers: stream.viewers,
      });

      await onlineSubscription.stop();
      process.exit(0);
    });

    async function cleanSubs() {
      await onlineSubscription.stop();
      process.exit(1);
    }

    process.on('SIGINT', cleanSubs);
    process.on('SIGQUIT', cleanSubs);
    process.on('SIGTERM', cleanSubs);
  })();
} catch (err) {
  console.error(err);
}
