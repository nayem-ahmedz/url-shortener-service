import { linkT } from "@/types/linkT";
import DeleteLink from "./DeleteLink";

export default async function UrlList({ initialLinks }: { initialLinks: linkT[] }) {
    return (
        <tbody>
            {
                initialLinks.map((link, index) => <tr key={link.id}>
                    <th>{initialLinks.length - index}</th>
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
                            {`${process.env.NEXT_PUBLIC_API_URL || 'website_link'}/${link.short_code}`}
                        </a>
                    </th>
                    <th className='text-center'>{link.clicks}</th>
                    <th>{new Date(link.created_at).toLocaleString()}</th>
                    <th>
                        <DeleteLink id={link.id} />
                    </th>
                </tr>)
            }
        </tbody>
    );
}