export const PYTHON_PROJECTS = {
    fileName: "python-projects",
    rules: {
        category: "Python",
        subDescription: "Enter the master scriptwriter's studio. Build versatile scripts, cinematic web applications with Django, and lightning-fast APIs with FastAPI.",
        studyOrder: "Strict",
        progression: "Foundations → Hollywood Production Hub",
        alignment: "Mapped strictly to python-1, python-2, python-3 syllabus"
    },
    individualProjects: [
        {
            id: 1,
            pythonLevel: "python-1",
            name: "Automated Casting Call (Foundations)",
            difficulty: "Very Easy",
            features: ["Create a script that filters actor profiles based on skills", "Use dictionaries to store character data", "Implement a virtual environment for the script"],
            concepts: ["Writer's shorthand (Syntax)", "Casting Characters (Variables)"]
        },
        {
            id: 2,
            pythonLevel: "python-1",
            name: "Scene Rehearsal Manager (OOP)",
            difficulty: "Easy",
            features: ["Design a 'CastMember' class hierarchy", "Implement decorators to log scene durations", "Read/Write script files safely"],
            concepts: ["Scene Rehearsals (Functions)", "Character Prototypes (OOP)"]
        },
        {
            id: 3,
            pythonLevel: "python-2",
            name: "Hollywood Film Tracker (Django)",
            difficulty: "Medium",
            features: ["Build a full-stack portal to track movie releases", "Implement a Record Room using Django ORM", "Create a director's dashboard using the Admin panel"],
            concepts: ["Hollywood Production Hub (Django)", "Film Archives (ORM)"]
        },
        {
            id: 4,
            pythonLevel: "python-2",
            name: "The Script Exchange API (DRF)",
            difficulty: "Medium",
            features: ["Expose your Film Tracker through a REST API", "Implement ID Badge checks (Authentication)", "Translate records into JSON (Serializers)"],
            concepts: ["API Windows (DRF)", "Security Checks"]
        },
        {
            id: 5,
            pythonLevel: "python-3",
            name: "Real-time Subtitle Booth (FastAPI)",
            difficulty: "Hard",
            features: ["Build a high-speed API for live subtitles", "Implement data validation using Pydantic", "Use Async operations for concurrent stream handling"],
            concepts: ["Speed-Dubbing Booth (FastAPI)", "Instant Recording (Async)"]
        },
        {
            id: 6,
            pythonLevel: "python-3",
            name: "The Global Premiere Engine (Advanced)",
            difficulty: "Hard",
            features: ["Automate background video exports using Celery", "Package the entire studio using Docker", "Implement GraphQL for smart data fetching"],
            concepts: ["Back-Stage Crew (Celery)", "Portable Studios (Docker)"]
        }
    ]
};
