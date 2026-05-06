import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const newUser = await prisma.user.create({
            data: {
                name: "John Doe " + Math.floor(Math.random() * 100),
                email: `john.doe.${Math.floor(Math.random() * 1000000)}@prisma.com`
            }
        });

        return NextResponse.json({
            data: newUser,
            success: true,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Internal Server Error"
        }, { status: 500 });
    }
}
