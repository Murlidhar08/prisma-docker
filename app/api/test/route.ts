import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json({
            data: users.length === 0 ? "No users have been added yet." : users,
            success: true,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Internal Server Error"
        }, { status: 500 });
    }
}
