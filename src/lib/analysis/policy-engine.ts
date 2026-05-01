export interface IPolicy {
    id: string;
    name: string;
    description: string;
    severity: 'info' | 'warning' | 'error';
    validator: (content: string) => boolean; 
}

export interface IAnalysisResult {
    policyId: string;
    line?: number;
    message: string;
}

export const defaultPolicies: IPolicy[] = [
    {
        id: 'no-console-log',
        name: 'No Verify Logs',
        description: 'Avoid shipping console.log statements to production',
        severity: 'warning',
        validator: (content) => !/console\.log\(/.test(content),
    },
    {
        id: 'max-lines',
        name: 'File Length',
        description: 'Files should not exceed 300 lines',
        severity: 'info',
        validator: (content) => content.split('\n').length <= 300,
    },
    {
        id: 'use-strict-types',
        name: 'Strict Types',
        description: 'Avoid using "any" type',
        severity: 'error',
        validator: (content) => !/: any/.test(content),
    }
];
