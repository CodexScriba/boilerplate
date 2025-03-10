import { NavLinkItem } from '../types';
import { Home, Info, Headphones, BookOpen, Mail } from 'lucide-react';

/**
 * Navigation links configuration
 * 
 * Each link has a path, icon, and translation key for the label
 * The translation key is used to fetch the localized label from the messages files
 * 
 * TODO: Add more navigation sections as needed
 * TODO: Consider adding nested navigation items for dropdown menus
 */
export const navLinks: NavLinkItem[] = [
  {
    href: '/',
    icon: Home,
    translationKey: 'Navigation.home'
  },
  {
    href: '/about',
    icon: Info,
    translationKey: 'Navigation.about'
  },
  {
    href: '/services',
    icon: Headphones,
    translationKey: 'Navigation.services'
  },
  {
    href: '/blog',
    icon: BookOpen,
    translationKey: 'Navigation.blog'
  },
  {
    href: '/contact',
    icon: Mail,
    translationKey: 'Navigation.contact'
  }
];