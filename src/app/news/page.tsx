'use client';

import { format } from 'date-fns';
import { useEffect, useState } from 'react';

// Since this is a public website, we should probably fetch from the public API.
// We need to know the API base URL. Environment variable usually.
// Looking at tiger/package.json, it's a Next.js app.
// I'll assume NEXT_PUBLIC_API_URL or similar is set, or hardcode/infer.
// tiger-admin uses VITE_API_BASE_URL.
// tiger app likely uses something similar.
// I'll try to find an existing API service or usage in tiger app.
// But for now I'll create the component structure.

interface News {
    _id: string;
    title: string;
    description: string;
    creationDate: string;
}

export default function NewsPage() {
    const [news, setNews] = useState<News[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Determine API URL
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

        fetch(`${apiUrl}/api/news`)
            .then((res) => res.json())
            .then((payload) => {
                // Backend now returns { data: News[] }
                setNews(payload.data || payload);
            })
            .catch((err) => console.error('Failed to load news', err))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl font-bold mb-8">Latest News</h1>
                <div className="animate-pulse flex flex-col gap-8 max-w-3xl mx-auto">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-100 h-64 rounded-lg"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-12 text-center">Latest News</h1>

            <div className="max-w-4xl mx-auto flex flex-col gap-12">
                {news.map((item) => (
                    <article key={item._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-8">
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                <time dateTime={item.creationDate}>
                                    {format(new Date(item.creationDate), 'MMMM d, yyyy')}
                                </time>
                            </div>

                            <h2 className="text-2xl font-bold mb-4 text-gray-900 leading-tight">
                                {item.title}
                            </h2>

                            <div
                                className="prose prose-lg max-w-none text-gray-600"
                                dangerouslySetInnerHTML={{ __html: item.description }}
                            />
                        </div>
                    </article>
                ))}

                {news.length === 0 && (
                    <div className="text-center text-gray-500 py-12">
                        No news updates available at the moment.
                    </div>
                )}
            </div>
        </div>
    );
}
