import { CraftAPI } from "@craftdocs/craft-extension-api";
import { fromApiResponse } from "./utils";

export const SUPPORTED_BLOGS = ["Ghost", "Medium"] as const;
export type Blog = typeof SUPPORTED_BLOGS[number];

export interface Tokens {
    ghostToken?: string;
    ghostUrl?: string;
    mediumToken?: string;
    mediumTag?: string;
}

const storageKey = (suffix: string) => `EXPORT-BLOG-EXTENSION-${suffix}`;

export const StorageKeys = {
    ghostToken: storageKey("ghostToken"),
    ghostUrl: storageKey("ghostUrl"),
    mediumToken: storageKey("mediumToken"),
    mediumTag: storageKey("mediumTag"),
};

export async function readTokens(api: CraftAPI): Promise<Tokens> {
    return {
        ghostToken: fromApiResponse<string, undefined>(
            await api.storageApi.get(StorageKeys.ghostToken),
            undefined
        ),
        ghostUrl: fromApiResponse<string, undefined>(
            await api.storageApi.get(StorageKeys.ghostUrl),
            undefined
        ),
        mediumToken: fromApiResponse<string, undefined>(
            await api.storageApi.get(StorageKeys.mediumToken),
            undefined
        ),
        mediumTag: fromApiResponse<string, undefined>(
            await api.storageApi.get(StorageKeys.mediumTag),
            undefined
        ),
    };
}

export async function persistTokens(
    api: CraftAPI,
    tokens: Tokens
): Promise<void> {
    if (tokens.ghostToken != null) {
        await api.storageApi.put(StorageKeys.ghostToken, tokens.ghostToken);
    }
    if (tokens.ghostUrl != null) {
        await api.storageApi.put(StorageKeys.ghostUrl, tokens.ghostUrl);
    }
    if (tokens.mediumToken != null) {
        await api.storageApi.put(StorageKeys.mediumToken, tokens.mediumToken);
    }
    if (tokens.mediumTag != null) {
        await api.storageApi.put(StorageKeys.mediumTag, tokens.mediumTag);
    }
}