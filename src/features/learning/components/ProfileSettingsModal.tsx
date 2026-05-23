'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { ModalShell } from '@/components/ui/ModalShell';

import { VALID_AVATARS } from '@/lib/constants/avatars';

interface ProfileSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ProfileSettingsModal({ isOpen, onClose }: ProfileSettingsModalProps) {
    const router = useRouter();
    const { data: session, update } = useSession();
    const [name, setName] = useState(session?.user?.name || '');
    const [selectedAvatar, setSelectedAvatar] = useState(session?.user?.image || VALID_AVATARS[0]);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || '');
            setSelectedAvatar(session.user.image || VALID_AVATARS[0]);
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
        <ModalShell isOpen={isOpen} onClose={onClose} containerClassName="max-w-md">
            <div className="p-8">
                <header className="mb-8">
                    <h2 className="text-2xl font-bold mb-2 text-[var(--fg-primary)]">Profile Settings</h2>
                    <p className="text-sm text-[var(--fg-muted)]">Customize how you appear in the community.</p>
                </header>

                <div className="space-y-8">
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)] mb-4">
                            Choose Avatar
                        </label>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                            {VALID_AVATARS.map((avatar) => {
                                const selected = selectedAvatar === avatar;
                                return (
                                    <button
                                        key={avatar}
                                        onClick={() => setSelectedAvatar(avatar)}
                                        className={`
                                            relative aspect-square rounded-md overflow-hidden border-2 transition-all duration-150
                                            ${selected ? 'border-[var(--color-primary)] scale-105' : 'border-[var(--surface-border)] hover:border-[var(--fg-muted)]'}
                                        `}
                                        type="button"
                                    >
                                        <Image src={avatar} alt="Avatar" fill className="object-cover" />
                                        {selected && (
                                            <div className="absolute inset-0 bg-[var(--color-primary)]/10 flex items-center justify-center">
                                                <div className="bg-[var(--color-primary)] text-white rounded-full p-1 shadow-sm">
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                                        <path d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Input
                            id="profile-name"
                            label="Display Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            maxLength={25}
                            error={error || undefined}
                            placeholder="Your Name"
                        />
                        <p className="text-[10px] text-[var(--fg-muted)] font-bold uppercase text-right">
                            {name.length}/25 characters
                        </p>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button variant="outline" onClick={onClose} className="flex-1">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={isSaving} loading={isSaving} className="flex-1">
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </ModalShell>
    );
}
