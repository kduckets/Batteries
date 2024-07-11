// pages/api/save-battery-level.ts
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { batteryLevel1, batteryLevel2 } = req.body;

    try {
      // Store the battery levels in some form of storage (e.g., environment variables, database, etc.)
      // For demonstration purposes, let's store in environment variables
      process.env.BATTERY_LEVEL_1 = batteryLevel1.toString();
      process.env.BATTERY_LEVEL_2 = batteryLevel2.toString();

      console.log(`Saved battery levels: ${batteryLevel1}, ${batteryLevel2}`);
      res.status(200).json({ message: 'Battery levels saved successfully.' });
    } catch (error) {
      console.error('Failed to save battery levels', error);
      res.status(500).json({ message: 'Failed to save battery levels.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
