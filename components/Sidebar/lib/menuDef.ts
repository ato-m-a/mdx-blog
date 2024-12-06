import type { MenuItemOptions } from './types';
import { FileText, Home, Briefcase } from 'lucide-react';

export const navigationDef: ReadonlyArray<MenuItemOptions> = [
  { href: '/', Icon: Home, label: 'Home' },
  { href: '/post', Icon: FileText, label: 'Post' },
] as const;

export const manageDataDef: ReadonlyArray<MenuItemOptions> = [
  { href: '/manage/career', Icon: Briefcase, label: 'Career' },
] as const;
