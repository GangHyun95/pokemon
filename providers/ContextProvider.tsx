'use client';

import React from 'react';
import { GlobalContextProvider } from '@/context/globalContext';

export default function ContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return <GlobalContextProvider>{children}</GlobalContextProvider>;
}
