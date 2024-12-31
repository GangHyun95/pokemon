'use client';

import { useUserStore } from '@/store/useUserStore';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';

export default function FetchUserDetails() {
    const { user } = useUser();
    const { fetchUserDetails, userDetails } = useUserStore();

    useEffect(() => {
        if (user?.sub && !userDetails) {
            fetchUserDetails(user.sub);
        }
    }, [user?.sub, userDetails, fetchUserDetails]);
    return null;
}
