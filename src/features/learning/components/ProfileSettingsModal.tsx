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
    
    // Core Profile States
    const [name, setName] = useState(session?.user?.name || '');
    const [selectedAvatar, setSelectedAvatar] = useState(session?.user?.image || VALID_AVATARS[0]);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // GitHub Integration States
    const [isGitHubLinked, setIsGitHubLinked] = useState(false);
    const [githubUser, setGithubUser] = useState<string | null>(null);
    const [githubAvatarUrl, setGithubAvatarUrl] = useState<string | null>(null);
    const [githubTokenInput, setGithubTokenInput] = useState('');
    const [isGitHubSaving, setIsGitHubSaving] = useState(false);
    const [githubError, setGithubError] = useState<string | null>(null);

    // Fetch GitHub status on mount/open
    useEffect(() => {
        if (isOpen) {
            fetchGitHubStatus();
        }
    }, [isOpen]);

    const fetchGitHubStatus = async () => {
        try {
            const res = await fetch('/api/user/github');
            if (res.ok) {
                const data = await res.json();
                setIsGitHubLinked(data.isLinked);
                setGithubUser(data.username || null);
                setGithubAvatarUrl(data.avatar || null);
            }
        } catch (e) {
            console.error('Error fetching github sync status:', e);
        }
    };

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

    // GitHub Linking Handlers
    const handleLinkGitHub = async () => {
        const token = githubTokenInput.trim();
        if (!token) {
            setGithubError('GitHub token is required');
            return;
        }

        setIsGitHubSaving(true);
        setGithubError(null);

        try {
            const res = await fetch('/api/user/github', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Invalid token');
            }

            setIsGitHubLinked(true);
            setGithubUser(data.username);
            setGithubAvatarUrl(data.avatar);
            setGithubTokenInput('');
        } catch (err: any) {
            setGithubError(err.message || 'Verification failed. Double check your token.');
        } finally {
            setIsGitHubSaving(false);
        }
    };

    const handleUnlinkGitHub = async () => {
        if (!confirm('Unlink your GitHub account? You will not be able to publish portfolios.')) return;

        setIsGitHubSaving(true);
        try {
            const res = await fetch('/api/user/github', { method: 'DELETE' });
            if (res.ok) {
                setIsGitHubLinked(false);
                setGithubUser(null);
                setGithubAvatarUrl(null);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsGitHubSaving(false);
        }
    };

    return (
        <ModalShell isOpen={isOpen} onClose={onClose} containerClassName="max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="p-8">
                <header className="mb-6">
                    <h2 className="text-2xl font-bold mb-1 text-[var(--fg-primary)]">Profile Settings</h2>
                    <p className="text-xs text-[var(--fg-muted)]">Customize how you appear in the community.</p>
                </header>

                <div className="space-y-6">
                    {/* Avatar choice */}
                    <div>
                        <label className="block text-[9px] font-bold uppercase tracking-widest text-[var(--fg-muted)] mb-3">
                            Choose Avatar
                        </label>
                        <div className="grid grid-cols-6 gap-1.5">
                            {VALID_AVATARS.map((avatar) => {
                                const selected = selectedAvatar === avatar;
                                return (
                                    <button
                                        key={avatar}
                                        onClick={() => setSelectedAvatar(avatar)}
                                        className={`
                                            relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-150 cursor-pointer
                                            ${selected ? 'border-[var(--color-primary)] scale-105 shadow-md shadow-[var(--color-primary)]/10' : 'border-[var(--surface-border)] hover:border-[var(--fg-muted)]'}
                                        `}
                                        type="button"
                                    >
                                        <Image src={avatar} alt="Avatar" fill className="object-cover" />
                                        {selected && (
                                            <div className="absolute inset-0 bg-[var(--color-primary)]/10 flex items-center justify-center">
                                                <div className="bg-[var(--color-primary)] text-white rounded-full p-0.5 shadow-sm scale-90">
                                                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
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

                    {/* Display name input */}
                    <div className="space-y-1.5">
                        <Input
                            id="profile-name"
                            label="Display Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            maxLength={25}
                            error={error || undefined}
                            placeholder="Your Name"
                        />
                        <p className="text-[9px] text-[var(--fg-muted)] font-black uppercase text-right">
                            {name.length}/25 characters
                        </p>
                    </div>

                    {/* Divider line */}
                    <div className="h-[1px] bg-white/5 w-full my-4" />

                    {/* GitHub Portfolio Integration */}
                    <div className="space-y-3">
                        <label className="block text-[9px] font-bold uppercase tracking-widest text-[var(--fg-muted)]">
                            GitHub Portfolio Sync
                        </label>

                        {isGitHubLinked ? (
                            <div className="p-3 border border-white/5 rounded-xl bg-white/[0.01] flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    {githubAvatarUrl && (
                                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10">
                                            <Image src={githubAvatarUrl} alt="GitHub Avatar" fill className="object-cover" />
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-white font-mono leading-none">@{githubUser}</h4>
                                        <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider mt-1 block">Linked Portfolio</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleUnlinkGitHub}
                                    className="px-2.5 py-1.5 border border-red-500/20 hover:border-red-500/50 bg-red-950/20 text-red-400 rounded-lg text-[9px] font-black uppercase tracking-wider cursor-pointer active:scale-95 transition-all"
                                >
                                    Unlink
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <p className="text-[10px] text-[var(--fg-secondary)] leading-relaxed font-semibold">
                                    Sync workspace repositories directly to GitHub! Paste your **Personal Access Token (classic)** with `repo` scopes.
                                    <a
                                        href="https://github.com/settings/tokens/new?description=Axiom%20Learning%20OS&scopes=repo"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--color-primary)] hover:underline ml-1 font-bold"
                                    >
                                        Get Token
                                    </a>
                                </p>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <Input
                                            id="github-token"
                                            value={githubTokenInput}
                                            onChange={(e) => setGithubTokenInput(e.target.value)}
                                            placeholder="ghp_xxxxxxxx..."
                                            error={githubError || undefined}
                                            className="font-mono text-xs"
                                        />
                                    </div>
                                    <Button
                                        onClick={handleLinkGitHub}
                                        loading={isGitHubSaving}
                                        className="h-9 text-[9px] uppercase tracking-wider px-3.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-cyan)] shadow-md mt-1.5"
                                    >
                                        Link
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer buttons */}
                    <div className="flex gap-3 pt-4 border-t border-white/5">
                        <Button variant="outline" onClick={onClose} className="flex-1 text-[10px] font-black uppercase tracking-wider">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={isSaving} loading={isSaving} className="flex-1 text-[10px] font-black uppercase tracking-wider">
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </ModalShell>
    );
}
