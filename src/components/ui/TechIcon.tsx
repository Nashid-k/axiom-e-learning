import React from 'react';
import Image from 'next/image';

interface TechIconProps {
    name: string;
    className?: string; 
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = "w-6 h-6" }) => {
    const iconName = name.toLowerCase();

    let fileName = iconName;

    if (iconName === 'html-official') fileName = 'html';
    else if (iconName === 'js' || iconName === 'javascript') fileName = 'javascript';
    else if (iconName === 'ts' || iconName === 'typescript') fileName = 'typescript';
    else if (iconName === 'next.js' || iconName === 'nextjs') fileName = 'nextjs';
    else if (iconName === 'node.js' || iconName === 'nodejs') fileName = 'nodejs';
    else if (iconName === 'nest.js' || iconName === 'nestjs') fileName = 'nestjs';
    else if (iconName === 'os' || iconName === 'operating systems' || iconName === 'operating-systems') fileName = 'os';
    else if (iconName === 'system design' || iconName === 'system-design') fileName = 'system-design';
    else if (iconName === 'web fundamentals' || iconName === 'web-fundamentals') fileName = 'web-fundamentals';
    else if (iconName === 'interview prep' || iconName === 'interview' || iconName === 'interview-prep') fileName = 'interview-prep';

    const KNOWN_ICONS = ['css', 'devops', 'dsa', 'git', 'html', 'javascript', 'mongodb', 'nestjs', 'networking', 'nextjs', 'nodejs', 'os', 'python', 'react', 'sql', 'system-design', 'testing', 'typescript', 'web-fundamentals', 'interview-prep'];

    if (!KNOWN_ICONS.includes(fileName)) {
        fileName = 'web-fundamentals'; 
    }



    return (
        <div className={`relative ${className} flex items-center justify-center`}>
            <Image
                src={`/icons/${fileName}.svg`}
                alt={`${name} icon`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority 
            />
        </div>
    );
};
