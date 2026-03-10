export const NETWORKING_PROJECTS = {
    fileName: "networking-projects",
    rules: {
        category: "Networking",
        subDescription: "Become a Global Digital Courier. Build the infrastructure that connects users to data, ensures secure delivery, and manages real-time communication flows.",
        studyOrder: "Strict",
        progression: "Local Post Office → Global Address Book → Special Delivery",
        alignment: "Mapped strictly to networking-1, networking-2, networking-3 syllabus"
    },
    individualProjects: [
        {
            id: 1,
            networkingLevel: "networking-1",
            name: "The Digital Envelope (OSI Layers)",
            difficulty: "Easy",
            features: ["Label a raw data packet with all 7 OSI 'Envelopes'", "Simulate the journey from the 'User App' to the 'Cable Room'", "Identify where errors occur in the delivery chain"],
            concepts: ["OSI Model", "Envelope Layers"]
        },
        {
            id: 2,
            networkingLevel: "networking-1",
            name: "The Certified Receipt (TCP Handshake)",
            difficulty: "Easy",
            features: ["Build a simple 'Knock-Knock' protocol (SYN, SYN-ACK, ACK)", "Simulate a 'Lost Package' and trigger a re-delivery", "Compare the speed with a 'Postcard' (UDP) delivery"],
            concepts: ["TCP/IP Rules", "Certified Mail (Reliability)"]
        },
        {
            id: 3,
            networkingLevel: "networking-2",
            name: "The Domain Phonebook (DNS Explorer)",
            difficulty: "Medium",
            features: ["Build a mini-DNS server that maps names to IP numbers", "Implement 'Phonebook Refreshing' (TTL and Caching)", "Handle 'Missing Numbers' (404 for domains)"],
            concepts: ["Global Phonebook (DNS)", "Record Mapping"]
        },
        {
            id: 4,
            networkingLevel: "networking-2",
            name: "Neighborhood Architect (Subnetting)",
            difficulty: "Medium",
            features: ["Design a neighborhood plan (Subnet) for 100 residents", "Assign unique IP addresses without overlaps", "Setup a 'Gatekeeper' (Router) to manage cross-neighborhood mail"],
            concepts: ["Neighborhood Planning", "Gating (NAT)"]
        },
        {
            id: 5,
            networkingLevel: "networking-3",
            name: "The Live Walkie-Talkie (WebSockets Chat)",
            difficulty: "Hard",
            features: ["Build a real-time chat room using a 'Live Line' (WebSocket)", "Synchronize messages across multiple 'Receivers' instantly", "Implement a 'Typing...' indicator using continuous live pings"],
            concepts: ["Special Delivery", "Digital Walkie-Talkie"]
        },
        {
            id: 6,
            networkingLevel: "networking-3",
            name: "The Global Route Optimizer (CDN Simulation)",
            difficulty: "Hard",
            features: ["Map out the shortest route for a packet across 5 cities", "Simulate a 'Road Closure' (Server Down) and find a new route", "Implement a 'Local Cache' to skip the global trip entirely"],
            concepts: ["Route Optimization", "Local Branches (CDN)"]
        }
    ]
};
