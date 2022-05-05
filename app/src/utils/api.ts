async function http<R>(input: RequestInfo, init: RequestInit, token?: string): Promise<R> {
    const options = { ...init, headers: { ...init?.headers } as Record<string, string> }

    if (init.body) {
        options.headers['Content-Type'] = 'application/json'
    }

    if (token) {
        options.headers['Authorization'] = `Token ${token}`
    }

    return fetch(input, options)
        .then(async (res) => {
            const body = await res.text()
            return body || res.ok
        })
        .then((maybeJson) => {
            try {
                if (typeof maybeJson === 'boolean') return maybeJson
                return JSON.parse(maybeJson)
            } catch (err) {
                return maybeJson
            }
        })
}

export async function get<R>(path: string, config?: RequestInit): Promise<R> {
    const init = { method: 'GET', ...config }
    return await http<R>(path, init)
}

export async function post<R>(
    path: string,
    body?: Record<string, any>,
    config?: RequestInit
): Promise<R> {
    const init = { method: 'POST', body: body ? JSON.stringify(body) : undefined, ...config }
    return await http<R>(path, init)
}

export async function put<R>(
    path: string,
    body: Record<string, any>,
    config?: RequestInit
): Promise<R> {
    const init = { method: 'PUT', body: JSON.stringify(body), ...config }
    return await http<R>(path, init)
}

export async function patch<R>(
    path: string,
    body: Record<string, any>,
    config?: RequestInit
): Promise<R> {
    const init = { method: 'PATCH', body: JSON.stringify(body), ...config }
    return await http<R>(path, init)
}

export async function del<R>(
    path: string,
    body: Record<string, any>,
    config?: RequestInit
): Promise<R> {
    const init = { method: 'DELETE', body: JSON.stringify(body), ...config }
    return await http<R>(path, init)
}
