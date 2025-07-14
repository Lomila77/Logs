import type { ReactNode } from 'react';

interface BackgroundProps {
    componentChildren: ReactNode;
}

const Background = ({ componentChildren }: BackgroundProps) => {
    return <div className="flex w-full flex-col items-center justify-center bg-[var(--primary)]/10  h-full">
            {componentChildren}
        </div>
}

export default Background;
