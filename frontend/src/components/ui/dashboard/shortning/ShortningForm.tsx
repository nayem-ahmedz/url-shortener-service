'use client';
import { axiosInstance } from "@/lib/axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ShortningForm() {
    const [loading, setLoading] = useState(false);
    const [shortUrl, setShortUrl] = useState('');
    const handleShorten = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const long_url = formData.get('long_url') as string;

        if (!long_url) return toast.error('Please enter a URL');

        setLoading(true);
        try {
            const res = await axiosInstance.post('/api/urls/shorten', { long_url });
            if (res.data.status) {
                setShortUrl(res.data.shortUrl);
                toast.success('URL shortened successfully!');
                form.reset();
            }
        } catch (err: any) {
            if (err.response?.status === 403) toast.warning(err.response.data.message);
            else toast.error('Failed to shorten URL');
            console.error('Shorten URL error:', err.message);
        } finally {
            setLoading(false);
        }
    };
    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        toast.info('Copied to clipboard!');
    };
    return (
        <>
            <form onSubmit={handleShorten} className="flex gap-2 mb-4">
                <input
                    type="url"
                    name="long_url"
                    placeholder="Paste your long URL here"
                    className="flex-1 border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {loading ? 'Shortening...' : 'Shorten'}
                </button>
            </form>
            {shortUrl && (
                <div className="mb-6 flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-blue-600">{shortUrl}</span>
                    <button onClick={() => copyToClipboard(shortUrl)} className="btn btn-primary btn-outline" >
                        Copy
                    </button>
                </div>
            )}
        </>
    );
}