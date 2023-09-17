import { generateCollectionCacheTag } from "@/lib";
import {
  GenerateCollectionCacheTagFuncArgs,
  GenerateGlobalCacheTagFuncArgs,
  generateGlobalCacheTag,
} from "@/lib/utils/generate-cache-tag";

const requestRevalidation = (opts: { tag: string } | { path: string }) => {
  const params = new URLSearchParams(opts);
  return fetch(`http://localhost:3000/api/revalidate?${params}`, {
    method: "POST",
  });
};

export default requestRevalidation;

export const revalidator = {
  revalidateCollection: ((...args) => {
    const tag = generateCollectionCacheTag(...args);
    return requestRevalidation({ tag });
  }) as GenerateCollectionCacheTagFuncArgs,
  revalidateGlobal: ((...args) => {
    const tag = generateGlobalCacheTag(...args);
    return requestRevalidation({ tag });
  }) as GenerateGlobalCacheTagFuncArgs,
};
