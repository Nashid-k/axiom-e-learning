'use client';

import { Button } from '@/components/ui/Button';
import { ModalShell, ModalCloseButton, ModalContent, ModalItem, modalItemVariants } from '@/components/ui/ModalShell';

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
            containerClassName="w-full max-w-2xl md:h-[85vh] md:max-h-[800px] max-h-[90vh]"
        >
            <div className="flex flex-col h-full overflow-hidden">
                <ModalContent className="flex items-center justify-between px-[var(--space-3)] py-[var(--space-3)] border-b border-[var(--border-default)] shrink-0">
                    <ModalItem variants={modalItemVariants}>
                        <h2 id="terms-modal-title" className="text-[var(--text-heading)] font-[var(--font-weight-bold)] text-[var(--fg-primary)]">
                            {type === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
                        </h2>
                    </ModalItem>
                    <ModalItem variants={modalItemVariants}>
                        <ModalCloseButton onClose={onClose} />
                    </ModalItem>
                </ModalContent>

                <div className="flex-1 overflow-y-auto px-[var(--space-3)] py-[var(--space-3)] custom-scrollbar">
                    <ModalContent className="flex flex-col gap-[var(--space-3)]">
                        {sections.map(({ title, body }) => (
                            <ModalItem key={title} variants={modalItemVariants} className="flex flex-col gap-[4px]">
                                <h3 className="text-[var(--fg-primary)] font-[var(--font-weight-semibold)] uppercase tracking-widest text-[10px]">
                                    {title}
                                </h3>
                                <p className="text-[var(--text-caption)] text-[var(--fg-secondary)] leading-[var(--leading-relaxed)]">
                                    {body}
                                </p>
                            </ModalItem>
                        ))}
                    </ModalContent>
                </div>

                <ModalContent className="px-[var(--space-3)] py-[var(--space-3)] border-t border-[var(--border-default)] bg-[var(--surface-overlay)] shrink-0">
                    <ModalItem variants={modalItemVariants}>
                        <Button onClick={onClose} variant="secondary" size="md" className="w-full">
                            I Understand
                        </Button>
                    </ModalItem>
                </ModalContent>
            </div>
        </ModalShell>
    );
}