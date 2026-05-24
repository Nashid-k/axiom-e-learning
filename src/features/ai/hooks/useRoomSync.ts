'use client';

import { useState, useEffect, useRef } from 'react';
import { VFS } from '../types/vfs-types';

interface Participant {
    email: string;
    name: string;
    avatar: string;
    lastActive: string;
}

interface useRoomSyncProps {
    roomId: string | null;
    files: VFS;
    setFiles: React.Dispatch<React.SetStateAction<VFS>>;
    activeFilePath: string;
    setActiveFilePath: (path: string) => void;
    setOpenTabs: React.Dispatch<React.SetStateAction<string[]>>;
}

export function useRoomSync({
    roomId,
    files,
    setFiles,
    activeFilePath,
    setActiveFilePath,
    setOpenTabs
}: useRoomSyncProps) {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [isSyncing, setIsSyncing] = useState(false);
    
    const roomVersion = useRef<number>(1);
    const isLocalEdit = useRef<boolean>(false);
    const lastPushedVfs = useRef<string>('');
    const localEditTimer = useRef<NodeJS.Timeout | null>(null);

    // 1. Fetch Remote Updates loop (GET)
    useEffect(() => {
        if (!roomId) {
            setParticipants([]);
            return;
        }

        const fetchRemoteSync = async () => {
            try {
                setIsSyncing(true);
                const res = await fetch(`/api/room/${roomId}`);
                if (!res.ok) return;

                const data = await res.json();
                
                // Update connected user list
                if (data.participants) {
                    setParticipants(data.participants);
                }

                // If remote has newer edits and we aren't actively typing
                if (data.version > roomVersion.current && !isLocalEdit.current) {
                    roomVersion.current = data.version;
                    
                    if (data.files) {
                        setFiles(data.files);
                        setOpenTabs(Object.keys(data.files));
                    }
                    if (data.activeFilePath) {
                        setActiveFilePath(data.activeFilePath);
                    }
                    lastPushedVfs.current = JSON.stringify(data.files);
                }
            } catch (e) {
                console.error('Error fetching pair room state:', e);
            } finally {
                setIsSyncing(false);
            }
        };

        // Run immediately on join
        fetchRemoteSync();

        // Start 1.5s revalidation loop
        const interval = setInterval(fetchRemoteSync, 1500);
        return () => clearInterval(interval);

    }, [roomId, setFiles, setActiveFilePath, setOpenTabs]);

    // 2. Debounce and push local updates (POST)
    useEffect(() => {
        if (!roomId) return;

        // Set local edit lock to prevent remote overrides while typing
        isLocalEdit.current = true;

        if (localEditTimer.current) {
            clearTimeout(localEditTimer.current);
        }

        localEditTimer.current = setTimeout(async () => {
            const vfsString = JSON.stringify(files);
            
            // Avoid redundant network requests if VFS content is identical
            if (vfsString === lastPushedVfs.current) {
                isLocalEdit.current = false;
                return;
            }

            try {
                const res = await fetch(`/api/room/${roomId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        files,
                        activeFilePath
                    })
                });

                if (res.ok) {
                    const data = await res.json();
                    roomVersion.current = data.version;
                    lastPushedVfs.current = vfsString;
                    if (data.participants) {
                        setParticipants(data.participants);
                    }
                }
            } catch (e) {
                console.error('Error pushing VFS state to room:', e);
            } finally {
                isLocalEdit.current = false;
            }
        }, 500); // 500ms debounce to prevent database hammering while typing

        return () => {
            if (localEditTimer.current) clearTimeout(localEditTimer.current);
        };

    }, [files, activeFilePath, roomId]);

    return {
        participants: participants.filter(p => p.email !== 'guest@axiom.io'), // filter out placeholder guests if needed, or keep
        isSyncing
    };
}
