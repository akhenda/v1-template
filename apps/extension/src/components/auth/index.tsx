import { useEffect } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { Separator as SeparatorUI } from '@repo/design-system/components/ui/separator';

import { SignIn } from './sign-in';
import { SignUp } from './sign-up';

const Layout = ({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <Card className="mx-auto w-96">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>{children}</div>
      </CardContent>
    </Card>
  );
};

const Separator = () => {
  return (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center">
        <SeparatorUI className="w-full" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
      </div>
    </div>
  );
};

export const Auth = { Layout, Separator, SignIn, SignUp };
