import { getRecipeCategory, type RecipeCategory } from '@chefly/api';
import { useCategoryStore } from '@chefly/store';

const CATEGORY_LOAD_ATTEMPTS = 3;
const CATEGORY_LOAD_RETRY_DELAY_MS = 500;

let activeCategoryRequest: Promise<RecipeCategory[]> | null = null;

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

async function loadRecipeCategories(): Promise<RecipeCategory[]> {
  const store = useCategoryStore.getState();

  store.setStatus('loading');

  for (let attempt = 1; attempt <= CATEGORY_LOAD_ATTEMPTS; attempt += 1) {
    try {
      const result = await getRecipeCategory();
      const categories = result.data?.data;

      if (categories) {
        store.setCategories(categories);
        store.setStatus('ready');
        return categories;
      }
    } catch {
      // Retry transient network and server failures.
    }

    if (attempt < CATEGORY_LOAD_ATTEMPTS) {
      await wait(CATEGORY_LOAD_RETRY_DELAY_MS * 2 ** (attempt - 1));
    }
  }

  store.setStatus('error');
  throw new Error('Unable to load recipe categories.');
}

export function hydrateRecipeCategories(
  forceRefresh = false,
): Promise<RecipeCategory[]> {
  const store = useCategoryStore.getState();

  if (!forceRefresh && store.status === 'ready') {
    return Promise.resolve(store.categories);
  }

  if (activeCategoryRequest) {
    return activeCategoryRequest;
  }

  activeCategoryRequest = loadRecipeCategories().finally(() => {
    activeCategoryRequest = null;
  });

  return activeCategoryRequest;
}
