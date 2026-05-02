'use client';

import { Button } from '@/components/ui/Button';
import { ModalShell, ModalCloseButton } from '@/components/ui/ModalShell';

interface TermsModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'terms' | 'privacy';
}

const TERMS_SECTIONS = [
    { title: '1. Using Axiom', body: 'By using Axiom, you agree to follow these terms and any applicable laws. If you violate them, we may suspend or terminate your access to keep the platform safe for everyone.' },
    { title: '2. User conduct', body: 'Be respectful, do not harass others, and do not attempt to attack, scrape, or abuse our systems. We reserve the right to remove accounts that put the platform or other users at risk.' },
    { title: '3. Content and IP', body: 'Curriculums, guides, and UI are the property of Axiom or our partners. You may use them for your own learning, but not resell or redistribute them as a product.' },
    { title: '4. No guarantees', body: 'Axiom is an educational tool and does not guarantee any specific outcomes. We are not liable for outages, data loss, or other issues outside our reasonable control.' },
];

const PRIVACY_SECTIONS = [
    { title: '1. Data we collect', body: 'We collect basic account information (name, email via Google Auth) and product usage data to improve Axiom.' },
    { title: '2. Leaderboard', body: 'Your display name and progress metrics may appear on the public leaderboard. Request account removal to opt out.' },
    { title: '3. Third parties', body: 'We use trusted providers (e.g., Google Auth) for authentication. We do not sell your personal data to advertisers.' },
];

export function TermsModal({ isOpen, onClose, type }: TermsModalProps) {
    const sections = type === 'terms' ? TERMS_SECTIONS : PRIVACY_SECTIONS;

    return (
        <ModalShell
            isOpen={isOpen}
            onClose={onClose}
            align="center"
            ariaLabelledBy="terms-modal-title"
            containerClassName="w-full max-w-2xl max-h-[90vh]"
        >
            <div className="flex flex-col h-full overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-neutral-100 dark:border-neutral-900 shrink-0 bg-white dark:bg-black">
                    <h2 id="terms-modal-title" className="text-xl font-bold">
                        {type === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
                    </h2>
                    <ModalCloseButton onClose={onClose} />
                </div>

                <div className="flex-1 overflow-y-auto p-6 bg-neutral-50 dark:bg-neutral-950">
                    <div className="flex flex-col gap-6">
                        {sections.map(({ title, body }) => (
                            <div key={title} className="flex flex-col gap-2">
                                <h3 className="font-bold uppercase tracking-widest text-[10px] text-neutral-400">
                                    {title}
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                    {body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 border-t border-neutral-100 dark:border-neutral-900 bg-white dark:bg-black shrink-0">
                    <Button onClick={onClose} variant="secondary" className="w-full">
                        I Understand
                    </Button>
                </div>
            </div>
        </ModalShell>
    );
}
