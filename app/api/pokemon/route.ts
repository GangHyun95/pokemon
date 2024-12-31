import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/connect';

export async function POST(req: NextRequest) {
    try {
        const { userId, pokemon, action } = await req.json();

        if (!['bookmark', 'like'].includes(action)) {
            return NextResponse.json(
                { message: '잘못된 작업입니다. (action이 bookmark 또는 like 여야 합니다.)' },
                { status: 400 }
            );
        }

        let user = await prisma.user.findUnique({
            where: { auth0Id: userId },
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    auth0Id: userId,
                    bookmarks: [],
                    liked: [],
                },
            });
        }

        const fieldToUpdate = action === 'bookmark' ? 'bookmarks' : 'liked';
        const currentItems = user[fieldToUpdate];

        let updatedItems;

        if (currentItems.includes(pokemon)) {
            updatedItems = currentItems.filter((item: any) => item !== pokemon);
        } else {
            updatedItems = [...currentItems, pokemon];
        }

        await prisma.user.update({
            where: { auth0Id: userId },
            data: {
                [fieldToUpdate]: updatedItems,
            },
        });

        return NextResponse.json({
            toggledOff: currentItems.includes(pokemon),
            success: true,
            message: `성공적으로 ${pokemon}를 ${action === 'bookmark' ? '북마크' : '좋아요'} 처리했습니다.`,
        });
    } catch (error) {
        console.log('링크 또는 북마크 처리 중 오류 발생', error);

        return NextResponse.json(
            { message: '요청을 처리하는 동안 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
