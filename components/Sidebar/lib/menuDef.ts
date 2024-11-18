import type { MenuItemOptions } from './types';
import { FileText, Home, Building, Briefcase } from 'lucide-react';

export const navigationDef: ReadonlyArray<MenuItemOptions> = [
  { href: '/', Icon: Home, label: 'Home' },
  { href: '/posts', Icon: FileText, label: 'Posts' },
] as const;

export const manageEntitiesDef: ReadonlyArray<MenuItemOptions> = [
  { href: '/company', Icon: Building, label: 'Company' },
  { href: '/experiences', Icon: Briefcase, label: 'Experiences' },
] as const;
