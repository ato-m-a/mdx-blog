import type { NextPage } from 'next';
import { Github, Linkedin } from 'lucide-react';
import Container from '@/components/Container';
import Paragraph from '@/components/Paragraph';
import IconButton from '@/components/IconButton';
import HeaderSection from './components/Sections/Header';
import ProfileSection from './components/Sections/Profile';
import HomeMain from './components/Sections/Main';

const Home: NextPage = () => {
  return (
    <Container>
      <HeaderSection>
        <HeaderSection.Name>홍준혁</HeaderSection.Name>
        <HeaderSection.Description>웹 프론트엔드 개발자</HeaderSection.Description>
      </HeaderSection>
      <HomeMain>
        <ProfileSection>
          <ProfileSection.Article
            label="현재 근무 중"
            data-id="current-job"
            className="max-sm:col-span-2"
          >
            <Paragraph
              as="a"
              href="https://earlivery.com"
              target="_blank"
              className="text-lg color-primary"
              hoverAnimation
            >
              트라이포드랩
            </Paragraph>
          </ProfileSection.Article>
          <ProfileSection.Article
            label="이전 경력 보기"
            data-id="previous-job-experience"
            className="max-sm:col-span-2"
          >
            <Paragraph
              as="a"
              className="text-lg color-primary relative"
              href="https://ato-m-a.notion.site/11ae2547cb49803186a5c7b789eb5549?pvs=74"
              target="_blank"
              hoverAnimation
            >
              포트폴리오 보기 →
            </Paragraph>
          </ProfileSection.Article>
          <ProfileSection.Article label="연락처" data-id="contact" className="max-md:col-span-2">
            <Paragraph
              as="a"
              href="mailto:atomjh0295@gmail.com"
              className="text-lg color-primary"
              hoverAnimation
            >
              atomjh0295@gmail.com
            </Paragraph>
          </ProfileSection.Article>
          <ProfileSection.Article
            label="소셜 미디어"
            data-id="social-media"
            className="max-md:col-span-2"
          >
            <Paragraph as="div" className="text-lg color-tertiary flex space-x-4">
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
            </Paragraph>
          </ProfileSection.Article>
        </ProfileSection>
      </HomeMain>
    </Container>
  );
};

export default Home;
