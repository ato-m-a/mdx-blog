import type { NextPage } from 'next';
import { HydrationBoundary } from '@tanstack/react-query';
import { getDehydrated } from '@trpc.lib';
import ProfileSection from './components/Sections/Profile';
import PostSection from './components/Sections/Post';
import AboutSection from './components/Sections/About';
import CareerSection from './components/Sections/Career';
import Container from '@/components/Container';
import HomeHeader from './components/Header';
import HomeMain from './components/Main';
import HomeFooter from './components/Footer';
import ThemeToggleButton from '@/components/ThemeToggleButton';
import LoginDialog from '@/components/LoginDialog';

const Home: NextPage = async () => {
  const dehydrated = await getDehydrated((helpers) => [
    helpers.experience.getCurrentJob.prefetch(),
    helpers.post.getMany.prefetch({ page: 1, limit: 4 }),
  ]);

  return (
    <Container>
      <HomeHeader>
        <HomeHeader.Name>
          홍준혁
          <ThemeToggleButton className="ml-2" />
        </HomeHeader.Name>
        <HomeHeader.Description>웹 프론트엔드 개발자</HomeHeader.Description>
      </HomeHeader>
      <HomeMain>
        <HydrationBoundary state={dehydrated}>
          <ProfileSection />
          <PostSection />
          <AboutSection />
          <CareerSection />
        </HydrationBoundary>
      </HomeMain>
      <HomeFooter />
      <LoginDialog />
    </Container>
  );
};

export default Home;
