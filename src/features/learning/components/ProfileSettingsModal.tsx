'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { ModalShell } from '@/components/ui/ModalShell';

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
        <ModalShell isOpen={isOpen} onClose={onClose} containerClassName="max-w-md">
            <div className="p-8">
                <header className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">Profile Settings</h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Customize how you appear in the community.</p>
                </header>

                <div className="space-y-8">
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4">
                            Choose Avatar
                        </label>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                            {AVATARS.map((avatar) => {
                                const selected = selectedAvatar === avatar;
                                return (
                                    <button
                                        key={avatar}
                                        onClick={() => setSelectedAvatar(avatar)}
                                        className={`
                                            relative aspect-square rounded-md overflow-hidden border-2 transition-none
                                            ${selected ? 'border-brand-500 scale-105' : 'border-neutral-100 dark:border-neutral-900 hover:border-neutral-300'}
                                        `}
                                        type="button"
                                    >
                                        <Image src={avatar} alt="Avatar" fill className="object-cover" />
                                        {selected && (
                                            <div className="absolute inset-0 bg-brand-500/10 flex items-center justify-center">
                                                <div className="bg-brand-500 text-white rounded-full p-1 shadow-sm">
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
                        <p className="text-[10px] text-neutral-400 font-bold uppercase text-right">
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
