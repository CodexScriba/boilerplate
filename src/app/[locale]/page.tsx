import Image from "next/image";
import { useTranslations } from 'next-intl';

/**
 * Home page component
 * 
 * This component renders a modern, sleek homepage that showcases
 * the technologies used in this boilerplate project
 * 
 * TODO: Add more translated content sections for additional features
 * TODO: Consider adding interactive elements like animations or hover effects
 * TODO: Implement dark mode toggle component for better user experience
 */
export default function Home() {
  // Get translations for the home page
  const t = useTranslations('Pages.home');
  const navT = useTranslations('Navigation');

  // Technology stack data
  const technologies = [
    {
      name: "Next.js 15",
      description: "The React framework for building modern web applications with server-side rendering and static site generation",
      icon: "/images/nextjs-icon.svg",
      link: "https://nextjs.org/"
    },
    {
      name: "TypeScript",
      description: "Strongly typed programming language that builds on JavaScript, giving you better tooling at any scale",
      icon: "/images/typescript-icon.svg",
      link: "https://www.typescriptlang.org/"
    },
    {
      name: "Tailwind CSS",
      description: "Utility-first CSS framework for rapidly building custom user interfaces without leaving your HTML",
      icon: "/images/tailwind-icon.svg",
      link: "https://tailwindcss.com/"
    },
    {
      name: "Next-Intl",
      description: "Internationalization (i18n) library for Next.js applications with built-in routing support",
      icon: "/images/i18n-icon.svg",
      link: "https://next-intl-docs.vercel.app/"
    },
    {
      name: "PostHog",
      description: "Open-source product analytics platform for tracking user behavior and improving your product",
      icon: "/images/posthog-icon.svg",
      link: "https://posthog.com/"
    }
  ];

  // Features of the boilerplate
  const features = [
    {
      title: "Responsive Design",
      description: "Fully responsive layouts that work beautifully on any device size",
      icon: "📱"
    },
    {
      title: "Internationalization",
      description: "Built-in multi-language support with locale-based routing",
      icon: "🌐"
    },
    {
      title: "Modern UI Components",
      description: "Pre-built UI components following best design practices",
      icon: "🎨"
    },
    {
      title: "Performance Optimized",
      description: "Optimized for Core Web Vitals and lightning-fast page loads",
      icon: "⚡"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 px-6 md:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10 -z-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Modern Next.js Boilerplate
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">
              A production-ready starter template with everything you need to build amazing web applications
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="https://github.com/your-repo/boilerplate" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors py-3 px-6 font-medium"
              >
                Get Started
              </a>
              <a 
                href="#features" 
                className="rounded-full border border-border hover:bg-muted transition-colors py-3 px-6 font-medium"
              >
                Explore Features
              </a>
            </div>
          </div>
          
          {/* Tech stack preview */}
          <div className="flex justify-center items-center gap-6 flex-wrap mt-12">
            <Image src="/images/nextjs-icon.svg" alt="Next.js" width={40} height={40} className="opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/images/typescript-icon.svg" alt="TypeScript" width={40} height={40} className="opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/images/tailwind-icon.svg" alt="Tailwind CSS" width={40} height={40} className="opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/images/i18n-icon.svg" alt="i18n" width={40} height={40} className="opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/images/posthog-icon.svg" alt="PostHog" width={40} height={40} className="opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 md:py-24 px-6 md:px-10 bg-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Powered by Modern Technologies
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-background rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-muted rounded-lg p-3">
                    <Image 
                      src={tech.icon} 
                      alt={tech.name} 
                      width={24} 
                      height={24} 
                      className="h-6 w-6"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{tech.name}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{tech.description}</p>
                <a 
                  href={tech.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent inline-flex items-center gap-1 font-medium"
                >
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-4 w-4">
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Key Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4 p-6 rounded-xl bg-muted/30">
                <div className="text-3xl">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6 md:px-10 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get started with this boilerplate and focus on building your product, not the infrastructure.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="https://github.com/your-repo/boilerplate" 
              target="_blank" 
              rel="noopener noreferrer"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors py-3 px-6 font-medium"
            >
              Clone Repository
            </a>
            <a 
              href="https://nextjs.org/docs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="rounded-full border border-border hover:bg-muted transition-colors py-3 px-6 font-medium"
            >
              Read Documentation
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Image 
              src="/images/Logo.svg" 
              alt="Logo" 
              width={32} 
              height={32} 
            />
            <span className="font-semibold">Next.js Boilerplate</span>
          </div>
          
          <div className="flex gap-6 flex-wrap items-center justify-center">
            <a
              className="flex items-center gap-2 hover:text-primary transition-colors"
              href="https://nextjs.org/learn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn
            </a>
            <a
              className="flex items-center gap-2 hover:text-primary transition-colors"
              href="https://vercel.com/templates?framework=next.js"
              target="_blank"
              rel="noopener noreferrer"
            >
              Templates
            </a>
            <a
              className="flex items-center gap-2 hover:text-primary transition-colors"
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
