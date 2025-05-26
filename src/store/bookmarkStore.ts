import { create } from 'zustand';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  rating: number;
};

type BookmarkStore = {
  bookmarks: User[];
  toggleBookmark: (user: User) => void;
  isBookmarked: (id: number) => boolean;
  removeBookmark: (id: number) => void;
};


export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  bookmarks: [],
  toggleBookmark: (user) => {
    const existing = get().bookmarks.find((u) => u.id === user.id);
    if (existing) {
      set({
        bookmarks: get().bookmarks.filter((u) => u.id !== user.id),
      });
    } else {
      set({
        bookmarks: [...get().bookmarks, user],
      });
    }
  },
  isBookmarked: (id) => !!get().bookmarks.find((u) => u.id === id),
  removeBookmark: (id) =>
    set({ bookmarks: get().bookmarks.filter((u) => u.id !== id) }),
}));

