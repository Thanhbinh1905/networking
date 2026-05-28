import { create } from "zustand";

interface ProgressStore {
	completedConcepts: string[];
	bookmarkedConcepts: string[];
	toggleCompletion: (id: string) => void;
	toggleBookmark: (id: string) => void;
}

export const useProgressStore = create<ProgressStore>((set) => ({
	completedConcepts: [],
	bookmarkedConcepts: [],
	toggleCompletion: (id) =>
		set((state) => ({
			completedConcepts: state.completedConcepts.includes(id)
				? state.completedConcepts.filter((c) => c !== id)
				: [...state.completedConcepts, id],
		})),
	toggleBookmark: (id) =>
		set((state) => ({
			bookmarkedConcepts: state.bookmarkedConcepts.includes(id)
				? state.bookmarkedConcepts.filter((c) => c !== id)
				: [...state.bookmarkedConcepts, id],
		})),
}));
