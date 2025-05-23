
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export function isRateLimited(key: string, limit = 10, windowMs = 60_000): boolean {
	const now = Date.now();
	const entry = rateLimitMap.get(key);

	if (!entry || now - entry.timestamp > windowMs) {
		rateLimitMap.set(key, { count: 1, timestamp: now });
		return false;
	}

	if (entry.count >= limit) {
		return true;
	}

	entry.count += 1;
	rateLimitMap.set(key, entry);
	return false;
}