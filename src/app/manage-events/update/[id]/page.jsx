import UpdateEventForm from '@/components/UpdateEventForm';
import { Suspense } from 'react';

export const instant = false;

async function EventLoader({ params }) {
    const resolvedParams = await params;
    const eventId = resolvedParams.id;

    let initialData = null;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`, {
            cache: 'no-store',
        });
        initialData = await res.json();
    } catch (err) {
        console.error('Failed to fetch event on server:', err);
    }

    return <UpdateEventForm eventId={eventId} initialData={initialData} />;
}

export default function Page({ params }) {
    return (
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
            <EventLoader params={params} />
        </Suspense>
    );
}