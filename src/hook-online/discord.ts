import dayjs from 'dayjs';
import { WebhookClient } from 'discord.js';

export async function sendOnlineToDiscordWebhook(
  webhookId: string,
  webhookToken: string,
  {
    name,
    displayName,
    profilePicture,
    game,
    viewers,
  }: { displayName: string; name: string; profilePicture: string; game?: string; viewers?: number }
) {
  const date = dayjs();
  const channelUrl = `https://www.twitch.tv/${name}`;
  const hook = new WebhookClient(webhookId, webhookToken);

  return hook.send(
    `Hey @everyone, ${displayName}, est maintenant en direct sur ${channelUrl} ! Allez y jeter un oeil !`,
    {
      embeds: [
        {
          title: channelUrl,
          url: channelUrl,
          color: 3263487,
          footer: {
            text: date.locale('fr').format('LLL'),
          },
          image: {
            url: `https://static-cdn.jtvnw.net/previews-ttv/live_user_${name}-640x360.jpg?v=${date.unix()}`,
          },
          thumbnail: {
            url: profilePicture,
          },
          author: {
            name: `${displayName} est en live`,
            icon_url: profilePicture,
          },
          fields: [
            ...(game !== undefined
              ? [
                  {
                    name: 'Game',
                    value: game,
                    inline: true,
                  },
                ]
              : []),
            ...(viewers !== undefined
              ? [
                  {
                    name: 'Viewers',
                    value: viewers,
                    inline: true,
                  },
                ]
              : []),
          ],
        },
      ],
    }
  );
}
