'use client';

import type { FC } from 'react';
import { Github, Linkedin } from 'lucide-react';
import { GITHUB_URL, LINKEDIN_URL } from '@/app/constants/url';
import ProfileArticle from './Article';
import HoverGroup from '@/components/HoverGroup';
import IconButton from '@/components/IconButton';
import ColorBadge from '@/components/ColorBadge';
import trpc from '@trpc.client';

const ProfileSection: FC = () => {
  const { data: currentExperience } = trpc.experience.getCurrent.useQuery();

  return (
    <section
      className={`
        flex w-100 justify-between col-span-2
        max-lg:grid max-lg:grid-cols-3 max-lg:gap-6
        max-md:grid-cols-2
        max-sm:grid-cols-1
      `}
    >
      <ProfileArticle label="현재 근무 중" data-id="current-job" className="max-sm:col-span-2">
        <HoverGroup as="a" className="company-label" href={currentExperience?.url ?? LINKEDIN_URL}>
          <ColorBadge color={currentExperience?.brandColor ?? '#25FF22'} />
          <span className="company-label__name">{currentExperience?.name ?? 'OPEN TO WORK'}</span>
        </HoverGroup>
      </ProfileArticle>
      <ProfileArticle
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
      </ProfileArticle>
      <ProfileArticle label="연락처" data-id="contact" className="max-md:col-span-2">
        <HoverGroup as="a" href="mailto:atomjh0295@gmail.com" className="text-lg color-primary">
          atomjh0295@gmail.com
        </HoverGroup>
      </ProfileArticle>
      <ProfileArticle label="소셜 미디어" data-id="social-media" className="max-md:col-span-2">
        <div className="text-lg color-tertiary flex space-x-4">
          <IconButton
            Icon={Github}
            anchorProps={{
              href: GITHUB_URL,
              target: '_blank',
            }}
          />
          <IconButton
            Icon={Linkedin}
            anchorProps={{
              href: LINKEDIN_URL,
              target: '_blank',
            }}
          />
        </div>
      </ProfileArticle>
    </section>
  );
};

export default ProfileSection;
