import type { NextPage } from 'next';
import { HydrationBoundary } from '@tanstack/react-query';
import { getDehydrated } from '@trpc.lib';
import HomeSections from './components/Sections';
import Container from '@/components/Container';
import HomeHeader from './components/Header';
import HomeMain from './components/Main';
import HomeFooter from './components/Footer';

const Home: NextPage = () => {
  const dehydrated = getDehydrated((helpers) => [
    helpers.experience.getCurrent.prefetch(),
    helpers.experience.getMany.prefetch(),
  ]);

  return (
    <Container>
      <HomeHeader>
        <HomeHeader.Name>홍준혁</HomeHeader.Name>
        <HomeHeader.Description>웹 프론트엔드 개발자</HomeHeader.Description>
      </HomeHeader>
      <HomeMain>
        <HydrationBoundary state={dehydrated}>
          <HomeSections.Profile />
          <HomeSections.Post />
          <HomeSections.About />
          <HomeSections.Experience />
        </HydrationBoundary>
      </HomeMain>
      <HomeFooter />
    </Container>
  );
};

export default Home;
