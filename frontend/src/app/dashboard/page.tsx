'use client';
import { axiosInstance } from '@/lib/axios';
import { linkT } from '@/types/linkT';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';

export default function DashboardHome() {
    const [shortUrl, setShortUrl] = useState('');
    const [links, setLinks] = useState<linkT[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    // Fetch existing links
    const fetchLinks = async () => {
        try {
            setFetching(true);
            const res = await axiosInstance.get('/api/urls/my-links');
            if (res.data.status) setLinks(res.data.links);
        } catch (err: any) {
            console.error('Error fetching links:', err);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    // Handle form submit
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
                fetchLinks();
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

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This short URL will be permanently deleted.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it',
        });
        if (!result.isConfirmed) return;
        try {
            await axiosInstance.delete(`/api/urls/delete/${id}`);
            toast.success('Link deleted successfully');
            fetchLinks();
        } catch (err) {
            toast.error('Failed to delete link');
            console.error('Delete error:', err);
        }
    };


    return (
        <section className="max-w-7xl">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">URL Shortener</h1>

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

            {
                links.length > 0 && <section className='mt-10 md:mt-16'>
                    <h2 className='text-2xl md:text-3xl mb-4'>List of all links</h2>
                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Original URL</th>
                                    <th>Short code</th>
                                    <th>Short URL</th>
                                    <th>Total Clicks</th>
                                    <th>Created At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    links.map((link, index) => <tr key={link.id}>
                                        <th>{index + 1}</th>
                                        <th>
                                            {
                                                link.long_url.length > 50 ? link.long_url.slice(0, 40) + '...' : link.long_url
                                            }
                                        </th>
                                        <th>{link.short_code}</th>
                                        <th>
                                            <a
                                                href={`${process.env.NEXT_PUBLIC_API_URL || 'website_link'}/${link.short_code}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 hover:underline"
                                            >
                                                { `${process.env.NEXT_PUBLIC_API_URL || 'website_link'}/${link.short_code}` }
                                            </a>
                                        </th>
                                        <th className='text-center'>{link.clicks}</th>
                                        <th>{new Date(link.created_at).toLocaleString()}</th>
                                        <th>
                                            <button onClick={() => handleDelete(link.id)} className='btn btn-error btn-outline flex gap-2 items-center'><FaTrash /> Delete</button>
                                        </th>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                    {
                        fetching && <p className='text-center'><span className="loading loading-dots loading-lg"></span></p>
                    }
                </section>
            }
        </section>
    );
}