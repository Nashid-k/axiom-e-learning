export const AI_ENGINEERING_CURRICULUM = {
    "ai-engineering": {
        fileName: "ai-engineering",
        description: "Master LLMs, RAG, and Autonomous Agents",
        category: "AI Engineering",
        subDescription: "Build modern AI applications. Learn Prompt Engineering, Retrieval-Augmented Generation, and how to orchestrate ReAct agents.",
        experienceLevels: ["1yoe", "2yoe", "3yoe", "4yoe", "4+yoe"],
        phases: [
            {
                phase: 1,
                title: "Foundations of LLMs",
                targetExperience: ["1yoe"],
                theory: [
                    "What is a Transformer? The Attention Mechanism",
                    "Tokens vs Words: How models read text",
                    "Context Windows: Limits and implications",
                    "Parameters and Model Weights: Open Source vs Proprietary"
                ],
                practicals: [
                    "Use a tokenizer playground to see how text is split",
                    "Compare outputs of Llama 3 and GPT-4 for the same prompt"
                ]
            },
            {
                phase: 2,
                title: "Advanced Prompt Engineering",
                targetExperience: ["1yoe", "2yoe"],
                theory: [
                    "Zero-shot vs Few-shot Prompting",
                    "Chain-of-Thought (CoT): Making the model 'think'",
                    "System Prompts: Defining agent personas",
                    "Prompt Injection and Security"
                ],
                practicals: [
                    "Write a system prompt that forces the model to only output JSON",
                    "Demonstrate a prompt injection attack and how to mitigate it"
                ]
            },
            {
                phase: 3,
                title: "Integrations & Streaming",
                targetExperience: ["2yoe"],
                theory: [
                    "OpenAI API & Groq API integrations",
                    "Server-Sent Events (SSE) for streaming text",
                    "Handling rate limits and exponential backoff",
                    "Cost calculation and token management"
                ],
                practicals: [
                    "Build a simple Next.js API route that streams an LLM response",
                    "Create a custom hook to consume an SSE stream in React"
                ]
            },
            {
                phase: 4,
                title: "Retrieval-Augmented Generation (RAG)",
                targetExperience: ["2yoe", "3yoe"],
                theory: [
                    "What are Embeddings? Mapping semantics to vectors",
                    "Vector Databases (Pinecone, Weaviate, Qdrant)",
                    "Chunking Strategies for large documents",
                    "Cosine Similarity and Semantic Search"
                ],
                practicals: [
                    "Generate embeddings for a text document using the OpenAI API",
                    "Build a basic semantic search over 5 documents"
                ]
            },
            {
                phase: 5,
                title: "Autonomous Agents & Tool Calling",
                targetExperience: ["3yoe", "4yoe"],
                theory: [
                    "The ReAct Pattern: Reason and Act",
                    "Function Calling (Tool Use) with LLMs",
                    "Memory management in long conversations",
                    "Agent frameworks (LangChain, LlamaIndex, AutoGen)"
                ],
                practicals: [
                    "Give an LLM a 'get_weather' tool and parse its function call",
                    "Build an agent loop that runs a tool and feeds the result back to the LLM"
                ]
            },
            {
                phase: 6,
                title: "Fine-tuning & Edge Deployment",
                targetExperience: ["4yoe", "4+yoe"],
                theory: [
                    "When to Fine-tune vs when to use RAG",
                    "LoRA and QLoRA (Low-Rank Adaptation)",
                    "Quantization: Shrinking models to run locally",
                    "Running models in the browser (WebLLM, ONNX)"
                ],
                practicals: [
                    "Prepare a JSONL dataset for OpenAI fine-tuning",
                    "Run a quantized local model using Ollama"
                ]
            }
        ]
    }
};
