import type { NextPage } from 'next';
import HomeSections from './components/Sections';
import Container from '@/components/Container';
import HomeHeader from './components/Header';
import HomeMain from './components/Main';
import HomeFooter from './components/Footer';

const Home: NextPage = () => {
  return (
    <Container>
      <HomeHeader>
        <HomeHeader.Name>홍준혁</HomeHeader.Name>
        <HomeHeader.Description>웹 프론트엔드 개발자</HomeHeader.Description>
      </HomeHeader>
      <HomeMain>
        <HomeSections.Profile />
        <HomeSections.Post />
        <HomeSections.About />
        <HomeSections.Experience />
      </HomeMain>
      <HomeFooter />
    </Container>
  );
};

export default Home;
