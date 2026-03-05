import { IPolicy, IAnalysisResult, defaultPolicies } from './policy-engine';

export const Analyzer = {
    analyze: (content: string, customPolicies: IPolicy[] = []): IAnalysisResult[] => {
        const policies = [...defaultPolicies, ...customPolicies];
        const results: IAnalysisResult[] = [];

        policies.forEach(policy => {
            const isValid = policy.validator(content);
            if (!isValid) {
                let line: number | undefined = undefined;
                const lines = content.split('\n');

                if (policy.id === 'no-console-log') {
                    const index = lines.findIndex(l => /console\.log\(/.test(l));
                    if (index !== -1) line = index + 1;
                } else if (policy.id === 'use-strict-types') {
                    const index = lines.findIndex(l => /: any/.test(l));
                    if (index !== -1) line = index + 1;
                }

                results.push({
                    policyId: policy.id,
                    line,
                    message: policy.severity === 'error' ? `Error: ${policy.description}` : `Warning: ${policy.description}`,
                });
            }
        });

        return results;
    }
};
