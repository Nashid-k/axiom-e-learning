export const DEVOPS_PROJECTS = {
    fileName: "devops-projects",
    rules: {
        category: "DevOps",
        subDescription: "Step onto the Factory Floor. Master the tools of automation, scaling, and cloud infrastructure to ensure your products reach the world instantly.",
        studyOrder: "Strict",
        progression: "Factory Floor → Automated Conveyor → Mega-Franchise",
        alignment: "Mapped strictly to the consolidated DevOps syllabus"
    },
    individualProjects: [
        {
            id: 1,
            devopsLevel: "devops",
            name: "The Portable Workshop (Docker)",
            difficulty: "Medium",
            features: ["Write a Dockerfile for a React/Node app", "Setup environment variables for production", "Run the app in a isolated container"],
            concepts: ["Shipping Containers (Docker)", "Assembly Guides (Dockerfile)"]
        },
        {
            id: 2,
            devopsLevel: "devops",
            name: "The Multi-Machine Factory (Docker Compose)",
            difficulty: "Medium",
            features: ["Setup a Frontend, Backend, and Database in separate containers", "Connect them using an internal network", "Use Volumes to save database data permanently"],
            concepts: ["Multi-Crate Assembly", "Factory Storage (Volumes)"]
        },
        {
            id: 3,
            devopsLevel: "devops",
            name: "The Auto-Shipping Line (CI/CD)",
            difficulty: "Hard",
            features: ["Setup a GitHub Action to run tests automatically", "Build a Docker image and push it to a registry on every code change", "Automate a deployment to Vercel or AWS"],
            concepts: ["Automated Conveyor (CI/CD)", "Packaging Stage"]
        },
        {
            id: 4,
            devopsLevel: "devops",
            name: "The Global Warehouse Lease (AWS EC2)",
            difficulty: "Hard",
            features: ["Deploy a live server on an AWS EC2 instance", "Setup Security Groups to allow only web traffic", "Connect a custom domain to your cloud factory"],
            concepts: ["Global Warehouse (AWS)", "Warehouse Security"]
        },
        {
            id: 5,
            devopsLevel: "devops",
            name: "The Self-Healing Fleet (Kubernetes)",
            difficulty: "Very Hard",
            features: ["Deploy a fleet of app instances on a K8s cluster", "Setup a Load Balancer to distribute visitors", "Test 'Self-Healing' by crashing a container manually"],
            concepts: ["Fleet Management (K8s)", "Scale & Reliability"]
        },
        {
            id: 6,
            devopsLevel: "devops",
            name: "The Control Room (Monitoring)",
            difficulty: "Hard",
            features: ["Setup a Grafana dashboard to watch server health", "Configure alerts for 'Low Disk Space' or 'High CPU'", "Aggregate logs to find a hidden bug"],
            concepts: ["Safety Gauges (Monitoring)", "Black-Box Logs"]
        }
    ]
};
