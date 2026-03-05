async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(error.error || response.statusText);
    }
    if (response.status === 204) return {} as T;
    return response.json();
}

async function request<T>(method: string, url: string, data?: unknown, config: RequestInit = {}): Promise<T> {
    const response = await fetch(url, {
        ...config, method,
        headers: { 'Content-Type': 'application/json', ...config.headers },
        ...(data ? { body: JSON.stringify(data) } : {}),
    });
    return handleResponse<T>(response);
}

export const api = {
    get: <T>(url: string, config?: RequestInit) => request<T>('GET', url, undefined, config),
    post: <T>(url: string, data: unknown, config?: RequestInit) => request<T>('POST', url, data, config),
    put: <T>(url: string, data: unknown, config?: RequestInit) => request<T>('PUT', url, data, config),
    delete: <T>(url: string, config?: RequestInit) => request<T>('DELETE', url, undefined, config),
};
