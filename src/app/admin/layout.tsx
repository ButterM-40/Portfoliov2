import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const host = h.get('host') ?? '';
  const isLocal = host.startsWith('localhost') || host.startsWith('127.0.0.1');

  if (!isLocal) notFound();

  return <>{children}</>;
}
