import type { MenuItemOptions } from './types';
import { FileText, Home, Building, Briefcase } from 'lucide-react';

export const navigationDef: ReadonlyArray<MenuItemOptions> = [
  { href: '/', Icon: Home, label: 'Home' },
  { href: '/post', Icon: FileText, label: 'Post' },
] as const;

export const manageDataDef: ReadonlyArray<MenuItemOptions> = [
  { href: '/manage/company', Icon: Building, label: 'Company' },
  { href: '/manage/experiences', Icon: Briefcase, label: 'Experience' },
] as const;
