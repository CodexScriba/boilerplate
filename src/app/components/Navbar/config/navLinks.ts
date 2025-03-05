import { NavLinkItem } from '../types';
import { Home, Info, Headphones, BookOpen, Mail } from 'lucide-react';

export const navLinks: NavLinkItem[] = [
  {
    href: '/',
    icon: Home,
    label: 'Home'
  },
  {
    href: '/about',
    icon: Info,
    label: 'About'
  },
  {
    href: '/services',
    icon: Headphones,
    label: 'Services'
  },
  {
    href: '/blog',
    icon: BookOpen,
    label: 'Blog'
  },
  {
    href: '/contact',
    icon: Mail,
    label: 'Contact'
  }
];