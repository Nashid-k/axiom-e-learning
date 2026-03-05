import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                vscode: {
                    bg: "#1e1e1e",
                    sidebar: "#252526",
                    activityBar: "#333333",
                    statusBar: "#007acc",
                    panel: "#1e1e1e",
                    inputModel: "#3c3c3c",
                    listHover: "#2a2d2e",
                    listActive: "#37373d",
                    text: "#cccccc",
                    textActive: "#ffffff",
                    border: "#454545",
                },
            },
        },
    },
    plugins: [],
};
export default config;
