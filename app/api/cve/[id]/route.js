import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/utils/mongodb';
import Cve from '@/lib/models/cve';

export async function GET(request, { params }) {
    await connectToDB();
  const { id } = await params;
  const cve = await Cve.findOne({ cveId: id.toUpperCase() });
 
  return NextResponse.json(cve);
}