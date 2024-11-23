import type { NextPage } from 'next';
import { HydrationBoundary } from '@tanstack/react-query';
import { getDehydrated } from 'trpc/lib';
import Container from '@/components/Container';
import createOpenGraph from '@/common/utils/createOpenGraph';
import createMetadata from '@/common/utils/createMetadata';
import ProfileSection from './components/Sections/Profile';
import PostSection from './components/Sections/Post';
import AboutSection from './components/Sections/About';
import CareerSection from './components/Sections/Career';
import HomeHeader from './components/Header';
import HomeMain from './components/Main';
import HomeFooter from './components/Footer';
import ThemeToggleButton from '@/components/ThemeToggleButton';

export const revalidate = 60;
export const metadata = createMetadata({
  pathname: '/',
  title: '홍준혁 | 웹 프론트엔드 개발자',
  description: '웹 프론트엔드 개발자 홍준혁입니다. 찾아주셔서 감사합니다!',
  ogImage: createOpenGraph({
    pathname: 'home',
    title: ['웹 프론트엔드 개발자 홍준혁입니다.', '찾아주셔서 감사합니다!'],
    subtitle: 'https://ato-m-a.me/',
  }),
});

const Home: NextPage = async () => {
  const dehydrated = await getDehydrated((helpers) => [
    helpers.experience.getCurrentJob.prefetch(),
    helpers.post.getMany.prefetch({ take: 4 }),
  ]);

  return (
    <Container className="space-y-16">
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
    </Container>
  );
};

export default Home;
