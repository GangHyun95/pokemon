import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/connect';

export async function POST(req: NextRequest) {
    try {
        return NextResponse.json({message: '성공'}, {status: 200})
    } catch (error) {
        console.log('링크 또는 북마크 처리 중 오류 발생', error);

        return NextResponse.json(
            { message: '오류' },
            { status: 500 }
        );
    }
}