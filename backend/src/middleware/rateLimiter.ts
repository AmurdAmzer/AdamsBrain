// This is like a bouncer at a club - controls how many requests get in
const userRequestCounts = new Map(); // Tracks requests per user

export function rateLimiter(userId: string): boolean {
    const now = Date.now();
    const userRequests = userRequestCounts.get(userId) || [];
    
    // Remove requests older than 1 hour
    const recentRequests = userRequests.filter(
        (time: number) => now - time < 60 * 60 * 1000 // 1 hour in milliseconds
    );
    
    // Check if user has made 10+ requests in the last hour
    if (recentRequests.length >= 10) {
        return false; // Block the request
    }
    
    // Add current request and allow it
    recentRequests.push(now);
    userRequestCounts.set(userId, recentRequests);
    return true; // Allow the request
}