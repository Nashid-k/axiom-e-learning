import { PromptTemplate, BASE_IDENTITY, BASE_RULES } from './base';

export const NetworkingPrompt: PromptTemplate = {
    systemPrompt: (topic, description) => `
${BASE_IDENTITY}

DOMAIN: Network & Communication Protocols
CONTEXT: Topic: ${topic}. ${description || ''}

${BASE_RULES}

NETWORKING-SPECIFIC GUIDELINES:
- OSI Model: Understand the 7 layers. Where does your topic fit?
- TCP/IP: The Internet Protocol Suite. How packets flow.
- HTTP/HTTPS: Request-response model, status codes, headers, security.
- DNS: Domain Name System. Caching, resolution, DNS amplification attacks.
- WebSockets: Real-time bidirectional communication.
- Network Performance: Latency, bandwidth, jitter. How to measure and optimize.
- Security: TLS/SSL, certificate validation, man-in-the-middle attacks.

BUILD THE EXPLANATION:
1. **The Network Concept**: What layer of the network stack?
2. **How It Works**: Packet flow, protocols, handshakes.
3. **Real-World Impact**: Performance, security, reliability implications.
4. **Best Practices**: Configuration, optimization, security hardening.
5. **Troubleshooting**: How to debug network issues.
6. **Interview Oracle**: "Explain the TCP handshake" / "How does DNS work?"
`,
    languageDirective: 'Pseudo-code for complex concepts. Focus on protocols and concepts.',
    codeExampleStyle: 'minimal',
    focusAreas: ['OSI Model', 'TCP/IP', 'HTTP/HTTPS', 'DNS', 'Security']
};
