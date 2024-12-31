import prisma from '@/utils/connect';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { userId: string } }
) {
    try {
        const { userId } = params;
        if (!userId) {
            return NextResponse.json(
                { message: '유효하지 않은 사용자입니다.' },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { auth0Id: userId },
        });

        if (!user) {
            return NextResponse.json(
                { message: '사용자를 찾을 수 없습니다.' },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        console.log('Error', error);
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}
