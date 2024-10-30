import type { NextPage } from 'next';
import { HydrationBoundary } from '@tanstack/react-query';
import { getDehydrated } from '@trpc.lib';
import ProfileSection from './components/Sections/Profile';
import PostSection from './components/Sections/Post';
import AboutSection from './components/Sections/About';
import ExperienceSection from './components/Sections/Experience';
import Container from '@/components/Container';
import HomeHeader from './components/Header';
import HomeMain from './components/Main';
import HomeFooter from './components/Footer';

const Home: NextPage = async () => {
  const dehydrated = await getDehydrated((helpers) => [
    helpers.experience.getCurrentJob.prefetch(),
    helpers.experience.getMany.prefetch(),
    helpers.post.getMany.prefetch({ page: 1, limit: 4 }),
  ]);

  return (
    <Container>
      <HomeHeader>
        <HomeHeader.Name>홍준혁</HomeHeader.Name>
        <HomeHeader.Description>웹 프론트엔드 개발자</HomeHeader.Description>
      </HomeHeader>
      <HomeMain>
        <HydrationBoundary state={dehydrated}>
          <ProfileSection />
          <PostSection />
          <AboutSection />
          <ExperienceSection />
        </HydrationBoundary>
      </HomeMain>
      <HomeFooter />
    </Container>
  );
};

export default Home;
