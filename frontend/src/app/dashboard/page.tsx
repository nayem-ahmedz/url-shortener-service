import ShortningForm from '@/components/ui/dashboard/shortning/ShortningForm';
import { linkT } from '@/types/linkT';
import Link from 'next/link';
import axiosSecure from '@/lib/axiosSecure';
import UrlList from '@/components/ui/dashboard/shortning/UrlList';

export default async function DashboardHome() {
    let errorOccurred = false;
    const axios = await axiosSecure();
    let links : linkT[] = [];
    try{
        const res = await axios.get('/api/url');
        links = res.data.links || [];
    }catch(err){
        errorOccurred = true;
        console.log(err);
    }
    if (errorOccurred) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-xl font-bold text-error">Unauthorized</h2>
                <p>Please login to view your links</p>
                <Link href="/login" className="btn btn-primary mt-4">Go to Login</Link>
            </div>
        );
    }
    return (
        <section className="max-w-7xl">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">URL Shortener</h1>

            <ShortningForm />
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
                            <UrlList initialLinks={links}/>
                        </table>
                    </div>
                </section>
            }
        </section>
    );
}