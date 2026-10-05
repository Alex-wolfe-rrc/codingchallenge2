import { Event, Attendee } from "../models/event";

const events: Event[] = [
    {
        id: 1,
        name: "Tech Conference 2025",
        date: "2025-03-15T09:00:00.000Z",
        capacity: 200,
        registrationCount: 185
    },
    {
        id: 2,
        name: "Startup Pitch Night",
        date: "2025-02-20T18:00:00.000Z",
        capacity: 50,
        registrationCount: 12
    },
    {
        id: 3,
        name: "Web Dev Workshop",
        date: "2025-02-10T10:00:00.000Z",
        capacity: 30,
        registrationCount: 30
    }
];

const attendees: Attendee[] = [
    {
        id: 1,
        name: "Jordan Smith",
        email: "jordan.smith@email.com"
    },
    {
        id: 2,
        name: "Alex Chen",
        email: "alex.chen@email.com"
    }
];

interface EventPopularity extends Event {
    spotsRemaining: number;
    popularityScore: number;
    popularityTier: string;
}

export function getAllEvents(): Event[] {
    return events;
}

export function getEventById(id: number): Event | undefined {
    return events.find((event: Event) => event.id === id);
}

export function calculatePopularityScore(event: Event): number {
    if (event.capacity === 0) {
        return 0;
    }

    const popularityScore =
        (event.registrationCount / event.capacity) * 100;

    return Math.round(popularityScore * 10) / 10;
}

export function getPopularityTier(popularityScore: number): string {
    if (popularityScore >= 90) {
        return "Hot";
    }

    if (popularityScore >= 70) {
        return "Popular";
    }

    if (popularityScore >= 50) {
        return "Moderate";
    }

    if (popularityScore >= 25) {
        return "Building";
    }

    return "New";
}

export function getEventPopularity(
    id: number
): EventPopularity | undefined {
    const event = getEventById(id);

    if (!event) {
        return undefined;
    }

    const popularityScore = calculatePopularityScore(event);
    const popularityTier = getPopularityTier(popularityScore);

    return {
        ...event,
        spotsRemaining: event.capacity - event.registrationCount,
        popularityScore,
        popularityTier
    };
}
