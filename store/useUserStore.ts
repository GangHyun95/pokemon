import { create } from 'zustand';

type UserDetails = {
    bookmarks: string[];
    liked: string[];
};

type UserStore = {
    userDetails: UserDetails | null;
    fetchUserDetails: (userId: string) => Promise<void>;
    performAction: (
        userId: string,
        pokemon: string,
        action: 'bookmark' | 'like'
    ) => Promise<void>;
};

export const useUserStore = create<UserStore>((set, get) => ({
    userDetails: null,

    fetchUserDetails: async (userId) => {
        try {
            const response = await fetch(`/api/user/${userId}`);
            if (!response.ok) {
                throw new Error('사용자 정보를 가져오는 데 실패했습니다.');
            }
            const data = await response.json();
            set({ userDetails: data });
        } catch (error) {
            console.error('사용자 정보를 가져오는 중 오류가 발생했습니다:', error);
        }
    },

    performAction: async (userId, pokemon, action) => {
        try {
            set((state) => {
                if (!state.userDetails) return state;

                const updatedBookmarks =
                    action === 'bookmark'
                        ? state.userDetails.bookmarks.includes(pokemon)
                            ? state.userDetails.bookmarks.filter((p) => p !== pokemon)
                            : [...state.userDetails.bookmarks, pokemon]
                        : state.userDetails.bookmarks;

                const updatedLikes =
                    action === 'like'
                        ? state.userDetails.liked.includes(pokemon)
                            ? state.userDetails.liked.filter((p) => p !== pokemon)
                            : [...state.userDetails.liked, pokemon]
                        : state.userDetails.liked;

                return {
                    userDetails: {
                        ...state.userDetails,
                        bookmarks: updatedBookmarks,
                        liked: updatedLikes,
                    },
                };
            });

            const response = await fetch('/api/pokemon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, pokemon, action }),
            });

            if (!response.ok) {
                throw new Error('요청을 수행하는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('요청을 수행하는 중 오류가 발생했습니다:', error);
            const { fetchUserDetails } = get();
            await fetchUserDetails(userId);
        }
    },
}));
