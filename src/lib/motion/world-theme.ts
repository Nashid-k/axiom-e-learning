
export const SORCERER_MAP: Record<string, { character: string; technique: string; grade: string; quote: string; color: string }> = {
    'react': { character: 'Build Interactive UIs', technique: 'Component Architecture', grade: 'Advanced', quote: 'Think in components. Build for scale.', color: 'text-cyan-400' },
    'javascript': { character: 'The Language of the Web', technique: 'Dynamic Programming', grade: 'Core', quote: 'Master the fundamentals, unlock the possibilities.', color: 'text-yellow-400' },
    'typescript': { character: 'Type-Safe Development', technique: 'Static Analysis', grade: 'Advanced', quote: 'Catch errors before they catch you.', color: 'text-blue-400' },

    'dsa': { character: 'Problem Solving Mastery', technique: 'Algorithmic Thinking', grade: 'Expert', quote: 'Every complex problem has a simple solution.', color: 'text-emerald-400' },

    'sql': { character: 'Relational Data Mastery', technique: 'Query Optimization', grade: 'Advanced', quote: 'Structure your data, power your applications.', color: 'text-sky-400' },
    'mongodb': { character: 'NoSQL & Document Stores', technique: 'Flexible Schemas', grade: 'Advanced', quote: 'Scale horizontally. Think in documents.', color: 'text-green-400' },

    'nodejs': { character: 'Server-Side JavaScript', technique: 'Event-Driven Architecture', grade: 'Advanced', quote: 'Build fast, scalable network applications.', color: 'text-lime-400' },

    'html': { character: 'Structure of the Web', technique: 'Semantic Markup', grade: 'Foundation', quote: 'The skeleton of the internet.', color: 'text-orange-500' },
    'css': { character: 'Style & Aesthetics', technique: 'Visual Design', grade: 'Foundation', quote: 'Make the web beautiful.', color: 'text-blue-500' },
    'git': { character: 'Version Control', technique: 'Time Travel', grade: 'Foundation', quote: 'Save early, save often.', color: 'text-orange-600' },
    'web fundamentals': { character: 'Web Protocols', technique: 'HTTP & Browsers', grade: 'Foundation', quote: 'Understand how the machine works.', color: 'text-blue-400' },

    'nextjs': { character: 'The React Framework', technique: 'Server Components', grade: 'Advanced', quote: 'Production grade React applications.', color: 'text-white' },
    'next.js': { character: 'The React Framework', technique: 'Server Components', grade: 'Advanced', quote: 'Production grade React applications.', color: 'text-white' },
    'nestjs': { character: 'Enterprise Node.js', technique: 'Modular Architecture', grade: 'Expert', quote: 'Scalable server-side applications.', color: 'text-red-500' },
    'python': { character: 'Universal Language', technique: 'Readability', grade: 'Core', quote: 'Simple is better than complex.', color: 'text-blue-400' },

    'networking': { character: 'Digital Nervous System', technique: 'Data Transmission', grade: 'Core', quote: 'Connect the world.', color: 'text-indigo-400' },
    'operating systems': { character: 'Ghost in the Machine', technique: 'Resource Management', grade: 'Expert', quote: 'Control the hardware.', color: 'text-blue-400' },
    'os': { character: 'Ghost in the Machine', technique: 'Resource Management', grade: 'Expert', quote: 'Control the hardware.', color: 'text-blue-400' },

    'devops': { character: 'Infrastructure as Code', technique: 'Continuous Delivery', grade: 'Expert', quote: 'Automate everything.', color: 'text-amber-400' },
    'testing': { character: 'Quality Assurance', technique: 'Test Driven Development', grade: 'Advanced', quote: 'Trust, but verify.', color: 'text-green-500' },
    'system design': { character: 'Architectural Mastery', technique: 'Scalability Patterns', grade: 'Expert', quote: 'Design for millions.', color: 'text-pink-500' },

    'interview prep': { character: 'Career Mastery', technique: 'Interview Cracking', grade: 'Special', quote: 'Preparation meets opportunity.', color: 'text-gray-200' },
};

export const HASHIRA_MAP = SORCERER_MAP;

export const getSorcererInfo = (id: string) => {
    const normalizedId = id.toLowerCase().replace(/-/g, ' ');
    return SORCERER_MAP[id] || SORCERER_MAP[normalizedId] || {
        character: 'Developer Path',
        technique: 'Core Skills',
        grade: 'Foundation',
        quote: 'Learn. Build. Ship.',
        color: 'text-blue-400'
    };
};

export const getHashiraInfo = getSorcererInfo;

export const getTechniqueAsset = (id: string) => {
    const info = getSorcererInfo(id);
    const grade = info.grade;

    const map: Record<string, string> = {
        'Expert': 'https://images.weserv.nl/?url=images8.alphacoders.com/133/1331871.jpeg',
        'Advanced': 'https://images.weserv.nl/?url=images2.alphacoders.com/132/1329089.jpeg',
        'Core': 'https://images.weserv.nl/?url=images3.alphacoders.com/127/1279058.jpeg',
        'Foundation': 'https://images.weserv.nl/?url=images.alphacoders.com/132/1320891.jpeg',
    };

    return map[grade] || 'https://images.weserv.nl/?url=images8.alphacoders.com/133/1331871.jpeg';
};

export const getBreathingAsset = getTechniqueAsset;

export const getGradeColor = (grade: string) => {
    switch (grade) {
        case 'Expert': return 'text-blue-500 border-blue-500/30 shadow-[inset_0_0_30px_rgba(168,85,247,0.3)]';
        case 'Advanced': return 'text-cyan-400 border-cyan-500/30 shadow-[inset_0_0_30px_rgba(34,211,238,0.2)]';
        case 'Core': return 'text-blue-400 border-blue-500/30 shadow-[inset_0_0_30px_rgba(59,130,246,0.2)]';
        case 'Foundation': return 'text-green-400 border-green-500/30 shadow-[inset_0_0_30px_rgba(34,197,94,0.2)]';
        default: return 'text-white border-white/30';
    }
}

export const getStyleColor = getGradeColor;
