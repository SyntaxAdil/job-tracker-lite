export async function api<T>(path: string, init: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    ...init,
    headers: { "Content-type": "application/json", ...init.headers },
  });

  const body = await res.json().catch(() => null);

  if (res.status === 401) {
    window.location.href = "singin";
  }
  if (!res.ok) {
    throw new Error(body?.message ?? "Something went wrong");
  }
  return body?.data as T;
}
