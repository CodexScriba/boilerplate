import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function AboutPage() {
  const t = useTranslations('Pages.about');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-8">
        <Link href="/" className="text-blue-500 hover:underline">
          ← Back to Home
        </Link>
      </nav>
      
      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <p className="mb-8">{t('description')}</p>
      
      <div className="prose max-w-none">
        <h2>Our Story</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, 
          nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl 
          nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl 
          aliquet nunc, quis aliquam nisl nunc quis nisl.
        </p>
        
        <h2>Our Mission</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, 
          nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl 
          nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl 
          aliquet nunc, quis aliquam nisl nunc quis nisl.
        </p>
        
        <h2>Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <h3 className="font-bold">Jane Doe</h3>
            <p className="text-gray-600">CEO & Founder</p>
          </div>
          
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <h3 className="font-bold">John Smith</h3>
            <p className="text-gray-600">CTO</p>
          </div>
          
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <h3 className="font-bold">Emily Johnson</h3>
            <p className="text-gray-600">Head of Design</p>
          </div>
        </div>
      </div>
    </div>
  );
}
