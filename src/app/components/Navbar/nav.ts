// Navigation configuration and types

export type NavItem = {
    title: string;
    href: string;
    description?: string;
  };
  
  export type NavConfig = {
    mainNav: NavItem[];
    languages: { code: string; name: string }[];
    logo: {
      src: string;
      alt: string;
    };
  };
  
  export const navConfig: NavConfig = {
    mainNav: [
      {
        title: "Schools",
        href: "/schools",
        description: "Find schools and educational programs",
      },
      {
        title: "News",
        href: "/news",
        description: "Latest news and updates",
      },
      {
        title: "About Us",
        href: "/about",
        description: "Learn more about our organization",
      },
    ],
    languages: [
      { code: "en", name: "English" },
      { code: "es", name: "Español" },
      { code: "fr", name: "Français" },
    ],
    logo: {
      src: "/logo.svg",
      alt: "Company Logo",
    },
  };