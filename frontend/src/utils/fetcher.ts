type TParams = {
  isAuth?: boolean;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: object;
};

export async function fetcher<T>(path: string, params: TParams): Promise<T> {
  const { isAuth = false, method, headers, body } = params;
  const url = `${process.env.API_URL}/${path}`;

  const authorizationHeader: Record<string, string> = isAuth
    ? { Authorization: `Bearer ${localStorage.getItem('token')}` }
    : {};

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...authorizationHeader,
        ...(headers || {}),
      },
      body: body ? JSON.stringify(body) : null,
    });
    const data = await response.json();

    if (!response.ok) {
      console.error('Fetch error: ', JSON.stringify(data));
      throw new Error('Fetch error: ' + JSON.stringify(data));
    }

    return data;
  } catch (e) {
    console.error('Fetch error: ', e);
    throw e;
  }
}
