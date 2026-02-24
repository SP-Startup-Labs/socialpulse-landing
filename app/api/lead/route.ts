export const runtime = 'nodejs';

import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const leadsPath = path.join(process.cwd(), 'data', 'leads.json');

type LeadPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization?: string;
  role?: string;
  checkSize?: string;
  stageInterest?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as LeadPayload;

    if (!payload.firstName || !payload.lastName || !payload.email || !payload.phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+()\-\s]{7,}$/;
    if (!emailRegex.test(payload.email) || !phoneRegex.test(payload.phone)) {
      return NextResponse.json({ error: 'Invalid email or phone format' }, { status: 400 });
    }

    await fs.mkdir(path.dirname(leadsPath), { recursive: true });

    let existingLeads: Array<LeadPayload & { submittedAt: string }> = [];
    try {
      const file = await fs.readFile(leadsPath, 'utf-8');
      existingLeads = JSON.parse(file);
    } catch {
      existingLeads = [];
    }

    existingLeads.push({ ...payload, submittedAt: new Date().toISOString() });
    await fs.writeFile(leadsPath, JSON.stringify(existingLeads, null, 2), 'utf-8');

    // TODO: Replace local JSON persistence with a production database (Supabase/Postgres/etc.).
    // TODO: Add transactional email notification for new lead submissions.
    // TODO: Add CRM integration (HubSpot/Salesforce/etc.) after qualification workflow is defined.

    return NextResponse.json({ message: 'Thanks — we’ll reach out shortly.' });
  } catch {
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}
