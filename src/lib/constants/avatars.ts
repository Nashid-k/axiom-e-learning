export const VALID_AVATARS = [
    '/avatars/boy-1.png', '/avatars/boy-2.png', '/avatars/boy-3.png',
    '/avatars/boy-4.png', '/avatars/boy-5.png',
    '/avatars/girl-1.png', '/avatars/girl-2.png', '/avatars/girl-3.png',
    '/avatars/girl-4.png', '/avatars/girl-5.png',
    '/avatars/default.png',
] as const;

export function safeAvatar(img?: string | null): string {
    return img && (VALID_AVATARS as readonly string[]).includes(img)
        ? img
        : '/avatars/default.png';
}
