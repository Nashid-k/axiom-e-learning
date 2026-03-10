export const TESTING_PROJECTS = {
    fileName: "testing-projects",
    rules: {
        category: "Testing",
        subDescription: "Enter the Quality Assurance Inspector's Lab. Build unbreakable systems by stress-testing components, verifying assembly lines, and automating customer test drives.",
        studyOrder: "Strict",
        progression: "Inspector's Foundations → Customer Test Drive",
        alignment: "Mapped strictly to the consolidated Testing syllabus"
    },
    individualProjects: [
        {
            id: 1,
            testingLevel: "testing",
            name: "The Unbreakable Calculator (Unit Testing)",
            difficulty: "Very Easy",
            features: ["Write stress tests for basic math operations", "Verify 'Dividing by Zero' errors are handled correctly", "Use Jest setup/teardown for fresh tests"],
            concepts: ["Inspector's Foundations", "Bolt Stress Tests (Unit)"]
        },
        {
            id: 2,
            testingLevel: "testing",
            name: "The Secure Login Vault (Mocking)",
            difficulty: "Easy",
            features: ["Test a login function by mocking a database specialist", "Use 'Spies' to verify if security logs are generated", "Simulate different error scenarios safely"],
            concepts: ["Stunt Doubles (Mocking)", "Security Inspections"]
        },
        {
            id: 3,
            testingLevel: "testing",
            name: "The Sign-Up Gate (Component Testing)",
            difficulty: "Medium",
            features: ["Use RTL to test a React Sign-Up form like a customer", "Verify error messages appear when typing invalid data", "Simulate form submissions and loading states"],
            concepts: ["Component Inspection (RTL)", "User Behaviors"]
        },
        {
            id: 4,
            testingLevel: "testing",
            name: "The API Assembly Check (Integration)",
            difficulty: "Medium",
            features: ["Write an assembly check using Supertest for a user API", "Verify that the frontend and backend talk correctly", "Handle async data fetching tests"],
            concepts: ["Assembly Line (Integration)", "Backend Checks"]
        },
        {
            id: 5,
            testingLevel: "testing",
            name: "The E-Commerce Journey (Cypress)",
            difficulty: "Hard",
            features: ["Automate a full journey from 'Landing Page' to 'Checkout'", "Instruct the dummy to handle login and search", "Verify that the final 'Thank You' receipt appears"],
            concepts: ["Customer Test Drive (E2E)", "Cypress Automation"]
        },
        {
            id: 6,
            testingLevel: "testing",
            name: "The Multi-Browser Challenge (Playwright)",
            difficulty: "Hard",
            features: ["Run your test drives across Chrome, Firefox, and Safari", "Implement visual testing to check for layout shifts", "Use the Trace Viewer to debug a specific 'Crash'"],
            concepts: ["Advanced Proving Grounds (Playwright)", "Visual Testing"]
        }
    ]
};
