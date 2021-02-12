import dotenv from 'dotenv';

dotenv.config();
let path = `${__dirname}/../.env.test`;

dotenv.config({ path: path });

export const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
export const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
export const TWITCH_USER_ID = process.env.TWITCH_USER_ID;
export const DISCORD_WEBHOOK_ID = process.env.DISCORD_WEBHOOK_ID;
export const DISCORD_WEBHOOK_TOKEN = process.env.DISCORD_WEBHOOK_TOKEN;
