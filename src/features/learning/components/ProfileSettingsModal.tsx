'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { ModalShell, ModalCloseButton, ModalContent, ModalItem, modalItemVariants } from '@/components/ui/ModalShell';

interface ProfileSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AVATARS = [
    '/avatars/boy-1.png', '/avatars/boy-2.png', '/avatars/boy-3.png', '/avatars/boy-4.png', '/avatars/boy-5.png',
    '/avatars/girl-1.png', '/avatars/girl-2.png', '/avatars/girl-3.png', '/avatars/girl-4.png', '/avatars/girl-5.png',
    '/avatars/default.png',
];

export default function ProfileSettingsModal({ isOpen, onClose }: ProfileSettingsModalProps) {
    const router = useRouter();
    const { data: session, update } = useSession();
    const [name, setName] = useState(session?.user?.name || '');
    const [selectedAvatar, setSelectedAvatar] = useState(session?.user?.image || AVATARS[0]);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || '');
            setSelectedAvatar(session.user.image || AVATARS[0]);
        }
    }, [session, isOpen]);

    const handleSave = async () => {
        if (!name.trim()) { setError('Name cannot be empty'); return; }
        setIsSaving(true); setError(null);
        try {
            const response = await fetch('/api/user/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), image: selectedAvatar }),
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to update profile');
            }
            await update({ ...session, user: { ...session?.user, name: name.trim(), image: selectedAvatar } });
            router.refresh();
            onClose();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <ModalShell isOpen={isOpen} onClose={onClose} ariaLabelledBy="profile-settings-title" containerClassName="w-full max-w-lg">
            <div className="flex flex-col">
                <ModalContent className="flex items-start justify-between px-[var(--space-3)] pt-[var(--space-3)] pb-[var(--space-2)]">
                    <ModalItem variants={modalItemVariants}>
                        <div>
                            <h2 id="profile-settings-title" className="text-[var(--text-heading)] font-[var(--font-weight-bold)] text-[var(--fg-primary)] leading-tight">
                                Customize Profile
                            </h2>
                            <p className="text-[var(--text-caption)] text-[var(--fg-muted)] mt-[4px]">
                                Choose your identity and how your name appears on the leaderboard.
                            </p>
                        </div>
                    </ModalItem>
                    <ModalItem variants={modalItemVariants} className="ml-[var(--space-2)]">
                        <ModalCloseButton onClose={onClose} />
                    </ModalItem>
                </ModalContent>

                <div className="h-px bg-[var(--border-default)]" />

                <ModalContent className="flex flex-col gap-[var(--space-4)] p-[var(--space-3)]">
                    <ModalItem variants={modalItemVariants}>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)] mb-[var(--space-2)]">
                            Choose Avatar
                        </label>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-[var(--space-1)]">
                            {AVATARS.map((avatar) => {
                                const selected = selectedAvatar === avatar;
                                return (
                                    <button
                                        key={avatar}
                                        onClick={() => setSelectedAvatar(avatar)}
                                        className={[
                                            "relative w-full aspect-square min-h-[44px]",
                                            "rounded-[var(--radius-lg)] overflow-hidden",
                                            "border-2 transition-all duration-[var(--duration-base)]",
                                            selected
                                                ? "border-[var(--color-500)] ring-4 ring-[var(--color-500)]/15 scale-105 shadow-[var(--shadow-md)]"
                                                : "border-transparent hover:border-[var(--border-strong)]",
                                        ].join(' ')}
                                        type="button"
                                        aria-pressed={selected}
                                        aria-label={`Select avatar ${avatar.split('/').pop()?.replace('.png', '')}`}
                                    >
                                        <div className="relative w-full h-full">
                                            <Image src={avatar} alt="Avatar option" fill className="object-cover" />
                                        </div>
                                        {selected && (
                                            <div className="absolute inset-0 bg-[var(--color-500)]/10 flex items-center justify-center">
                                                <div className="bg-[var(--color-500)] text-white rounded-[var(--radius-full)] p-[4px] shadow-[var(--shadow-sm)]">
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </ModalItem>

                    <ModalItem variants={modalItemVariants}>
                        <Input
                            id="profile-name"
                            label="Display Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            maxLength={25}
                            error={error || undefined}
                            placeholder="Your Legend Name"
                        />
                        <p className="mt-[4px] text-[10px] text-[var(--fg-muted)] text-right px-[var(--space-1)]">
                            {name.length}/25 characters
                        </p>
                    </ModalItem>


                    <ModalItem variants={modalItemVariants} className="flex gap-[var(--space-1)] pt-[var(--space-1)]">
                        <Button variant="secondary" onClick={onClose} className="flex-1" type="button">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={isSaving} className="flex-1" type="button">
                            {isSaving ? 'Synchronizing...' : 'Save Changes'}
                        </Button>
                    </ModalItem>
                </ModalContent>
            </div>
        </ModalShell>
    );
}