'use client';

import Link from 'next/link';

type Props = {
    currentPage: number;
    totalPages: number;
};

export default function Pagination({ currentPage, totalPages }: Props) {
    const maxVisiblePages = 5;

    const getPageNumbers = () => {
        const pages: (number | '...')[] = [];
        pages.push(1);

        if (currentPage < maxVisiblePages) {
            for (let i = 2; i <= Math.min(totalPages - 1, maxVisiblePages); i++) {
                pages.push(i);
            }
        } else {
            const half = Math.floor((maxVisiblePages - 1) / 2);
            const startPage = Math.max(2, currentPage - half); 
            const endPage = Math.min(totalPages - 1, currentPage + half);

            if (startPage > 2) {
                pages.push('...');
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
        }

        if (currentPage + Math.floor((maxVisiblePages - 1) / 2) < totalPages - 1) {
            pages.push('...');
        }

        pages.push(totalPages);

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="mb-10 flex justify-center items-center gap-2">
            {pageNumbers.map((page, index) => {
                if (page === '...') {
                    return (
                        <span key={`ellipsis-${index}`} className="text-gray-500 px-2">
                            ...
                        </span>
                    );
                }
                return (
                    <Link
                        key={page}
                        href={`/?page=${page}`}
                        className={`py-2 px-4 w-10 h-10 flex items-center justify-center rounded-full ${
                            page === currentPage
                                ? 'bg-purple text-white font-bold'
                                : 'bg-gray-200 text-black hover:bg-purple/30'
                        }`}
                    >
                        {page}
                    </Link>
                );
            })}
        </div>
    );
}
