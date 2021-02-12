import { ApiClient } from 'twitch';
import { ClientCredentialsAuthProvider } from 'twitch-auth';
import { EventSubListener } from 'twitch-eventsub';
import { NgrokAdapter } from 'twitch-eventsub-ngrok';
import { v4 as uuidv4 } from 'uuid';

export function initListener(clientId: string, clientSecret: string): EventSubListener {
  const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
  const apiClient = new ApiClient({ authProvider });
  return new EventSubListener(apiClient, new NgrokAdapter(), uuidv4());
}
