import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function PricingPage() {
  const t = useTranslations('Pages.pricing');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-8">
        <Link href="/" className="text-blue-500 hover:underline">
          ← Back to Home
        </Link>
      </nav>
      
      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <p className="mb-8">{t('description')}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Free Plan */}
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-2">Free</h2>
          <p className="text-3xl font-bold mb-4">$0<span className="text-sm font-normal">/month</span></p>
          <ul className="space-y-2 mb-6">
            <li>✓ Basic features</li>
            <li>✓ 1 user</li>
            <li>✓ 500MB storage</li>
          </ul>
          <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Get Started
          </button>
        </div>
        
        {/* Pro Plan */}
        <div className="border rounded-lg p-6 shadow-sm bg-blue-50 border-blue-200">
          <h2 className="text-xl font-bold mb-2">Pro</h2>
          <p className="text-3xl font-bold mb-4">$29<span className="text-sm font-normal">/month</span></p>
          <ul className="space-y-2 mb-6">
            <li>✓ All Free features</li>
            <li>✓ 5 users</li>
            <li>✓ 10GB storage</li>
            <li>✓ Priority support</li>
          </ul>
          <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Upgrade to Pro
          </button>
        </div>
        
        {/* Enterprise Plan */}
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-2">Enterprise</h2>
          <p className="text-3xl font-bold mb-4">$99<span className="text-sm font-normal">/month</span></p>
          <ul className="space-y-2 mb-6">
            <li>✓ All Pro features</li>
            <li>✓ Unlimited users</li>
            <li>✓ 100GB storage</li>
            <li>✓ 24/7 support</li>
            <li>✓ Custom integrations</li>
          </ul>
          <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}
