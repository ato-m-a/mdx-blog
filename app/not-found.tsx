import type { NextPage } from 'next';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/Container';
import BackLink from '@/app/components/BackLink';

const NotFound: NextPage = () => {
  return (
    <Container className="flex justify-center items-center">
      <div className="text-center space-y-8">
        <h1 className="text-9xl font-extrabold color-primary">404</h1>
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">Oops! Page not found 🥲</h2>
          <p className="color-secondary max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is
            temporarily unavailable.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
          <BackLink>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </BackLink>
        </div>
      </div>
    </Container>
  );
};

export default NotFound;
