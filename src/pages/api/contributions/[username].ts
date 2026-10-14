import type { APIRoute } from 'astro';

export const prerender = false;

const UPSTREAM_TIMEOUT_MS = 10_000;
const CACHE_TTL_MS = 5 * 60 * 1000;
const MAX_CACHE_ENTRIES = 100;
const USERNAME_PATTERN = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/;

type CacheEntry = {
	data: unknown;
	expiresAt: number;
};

const cache = new Map<string, CacheEntry>();

function jsonResponse(data: unknown, status = 200) {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': status === 200 ? 'private, max-age=300' : 'no-store',
		},
	});
}

function pruneCache(now: number) {
	for (const [username, entry] of cache) {
		if (entry.expiresAt <= now) {
			cache.delete(username);
		}
	}

	while (cache.size >= MAX_CACHE_ENTRIES) {
		const oldestUsername = cache.keys().next().value;
		if (oldestUsername === undefined) {
			break;
		}
		cache.delete(oldestUsername);
	}
}

export const GET: APIRoute = async ({ params }) => {
	const username = params.username?.trim();

	if (!username || !USERNAME_PATTERN.test(username)) {
		return jsonResponse(
			{ error: 'Invalid GitHub username.' },
			400,
		);
	}

	const cacheKey = username.toLowerCase();
	const now = Date.now();
	const cached = cache.get(cacheKey);
	if (cached && cached.expiresAt > now) {
		return jsonResponse(cached.data);
	}
	if (cached) {
		cache.delete(cacheKey);
	}

	const upstreamUrl = `https://github.com/${encodeURIComponent(username)}.contribs`;

	try {
		const response = await fetch(upstreamUrl, {
			signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
			headers: {
				Accept: 'application/json',
			},
		});

		if (!response.ok) {
			const status = response.status === 404 ? 404 : 502;
			return jsonResponse(
				{
					error:
						status === 404
							? 'GitHub user contribution data was not found.'
							: 'GitHub contribution service returned an error.',
				},
				status,
			);
		}

		let data: unknown;
		try {
			data = await response.json();
		} catch {
			return jsonResponse(
				{ error: 'GitHub returned an invalid JSON response.' },
				502,
			);
		}

		pruneCache(Date.now());
		cache.set(cacheKey, {
			data,
			expiresAt: Date.now() + CACHE_TTL_MS,
		});

		return jsonResponse(data);
	} catch (error) {
		if (error instanceof DOMException && error.name === 'TimeoutError') {
			return jsonResponse(
				{ error: 'GitHub contribution service timed out.' },
				504,
			);
		}

		return jsonResponse(
			{ error: 'Unable to reach the GitHub contribution service.' },
			502,
		);
	}
};
