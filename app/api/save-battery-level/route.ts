// app/api/save-battery-level/route.ts
import { NextResponse } from 'next/server';

interface BatteryRequest {
  batteryLevel: number;
}

export async function POST(request: Request) {
  const { batteryLevel }: BatteryRequest = await request.json();

  try {
    // Save battery level to a database or a file (this is just a placeholder)
    console.log(`Battery level saved: ${batteryLevel}`);
    return NextResponse.json({ message: 'Battery level saved successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Failed to save battery level', error);
    return NextResponse.json({ message: 'Failed to save battery level.' }, { status: 500 });
  }
}
