import { TopicProvider } from "@/lib/providers/topic-context";
import { ModalProvider } from "@/features/ai/context/ModalContext";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
    return (
        <TopicProvider>
            <ModalProvider>
                {children}
            </ModalProvider>
        </TopicProvider>
    );
}
