import { createApp } from '../server';

let appInstance: Awaited<ReturnType<typeof createApp>> | null = null;

export default async function handler(req: any, res: any) {
  if (!appInstance) {
    appInstance = await createApp();
  }
  return appInstance(req, res);
}
