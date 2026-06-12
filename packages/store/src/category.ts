import type { RecipeCategory } from "@chefly/api"
import { create } from "zustand"

import type { StoreStatus } from "./user"

interface CategoryStore
{
    categories: RecipeCategory[]
    status: StoreStatus
    setCategories: (categories: RecipeCategory[]) => void
    setStatus: (status: StoreStatus) => void
}

export const useCategoryStore = create<CategoryStore>((set) => ({
    categories: [],
    status: "idle",
    setCategories: (categories) => set({ categories }),
    setStatus: (status) => set({ status }),
}))
