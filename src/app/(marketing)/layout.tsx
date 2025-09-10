import { MarketingHeader } from '@/components/layout/marketing-header';
import { MarketingFooter } from '@/components/layout/marketing-footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <MarketingFooter />
    </div>
  );
}
