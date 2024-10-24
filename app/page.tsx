import type { NextPage } from 'next';
import { Github, Linkedin } from 'lucide-react';
import Container from '@/components/Container';
import HoverGroup from '@/components/HoverGroup';
import IconButton from '@/components/IconButton';
import HomeHeader from './components/Header';
import HomeMain from './components/Main';
import ProfileSection from './components/Sections/Profile';
import PostSection from './components/Sections/Post';

const Home: NextPage = () => {
  return (
    <Container>
      <HomeHeader>
        <HomeHeader.Name>홍준혁</HomeHeader.Name>
        <HomeHeader.Description>웹 프론트엔드 개발자</HomeHeader.Description>
      </HomeHeader>
      <HomeMain>
        <ProfileSection>
          <ProfileSection.Article
            label="현재 근무 중"
            data-id="current-job"
            className="max-sm:col-span-2"
          >
            <HoverGroup
              as="a"
              href="https://earlivery.com"
              target="_blank"
              className="text-lg color-primary"
            >
              트라이포드랩
            </HoverGroup>
          </ProfileSection.Article>
          <ProfileSection.Article
            label="이전 경력 보기"
            data-id="previous-job-experience"
            className="max-sm:col-span-2"
          >
            <HoverGroup
              as="a"
              className="text-lg color-primary relative"
              href="https://ato-m-a.notion.site/11ae2547cb49803186a5c7b789eb5549?pvs=74"
              target="_blank"
            >
              포트폴리오 보기 →
            </HoverGroup>
          </ProfileSection.Article>
          <ProfileSection.Article label="연락처" data-id="contact" className="max-md:col-span-2">
            <HoverGroup as="a" href="mailto:atomjh0295@gmail.com" className="text-lg color-primary">
              atomjh0295@gmail.com
            </HoverGroup>
          </ProfileSection.Article>
          <ProfileSection.Article
            label="소셜 미디어"
            data-id="social-media"
            className="max-md:col-span-2"
          >
            <div className="text-lg color-tertiary flex space-x-4">
              <IconButton
                Icon={Github}
                anchorProps={{
                  href: 'https://github.com/ato-m-a/',
                  target: '_blank',
                }}
              />
              <IconButton
                Icon={Linkedin}
                anchorProps={{
                  href: 'https://www.linkedin.com/in/hongjunhyuk/',
                  target: '_blank',
                }}
              />
            </div>
          </ProfileSection.Article>
        </ProfileSection>
        <PostSection>
          <PostSection.Article title="테스트" publishDate={new Date()} categories={['테스트']} />
          <PostSection.Article title="테스트" publishDate={new Date()} categories={['테스트']} />
          <PostSection.Article title="테스트" publishDate={new Date()} categories={['테스트']} />
          <PostSection.Article title="테스트" publishDate={new Date()} categories={['테스트']} />
        </PostSection>
      </HomeMain>
    </Container>
  );
};

export default Home;
