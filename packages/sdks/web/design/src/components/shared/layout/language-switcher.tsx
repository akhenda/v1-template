'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';

import { Languages } from 'lucide-react';

import { Button } from '../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';

const languages = [
  { label: '🇬🇧 English', value: 'en' },
  { label: '🇪🇸 Español', value: 'es' },
  { label: '🇩🇪 Deutsch', value: 'de' },
  { label: '🇨🇳 中文', value: 'zh' },
  { label: '🇫🇷 Français', value: 'fr' },
  { label: '🇵🇹 Português', value: 'pt' },
  { label: '🇰🇪 Swahili', value: 'sw' },
];

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const switchLanguage = (locale: string) => {
    // Replace the current locale in the pathname with the new one
    if (params.locale === 'en') {
      router.push(`/${locale}${pathname}`);
    } else {
      const newPathname = pathname.replace(`/${params.locale}`, `/${locale}`);

      router.push(newPathname);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="shrink-0 text-foreground" size="icon" variant="ghost">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {languages.map(({ label, value }) => (
          <DropdownMenuItem key={value} onClick={() => switchLanguage(value)}>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
