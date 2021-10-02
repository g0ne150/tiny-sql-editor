export async function executionRequest(sql: string): Promise<string> {
    const response = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sql }),
    })
    return response.text()
}
