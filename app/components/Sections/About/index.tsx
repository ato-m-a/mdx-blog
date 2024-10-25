import type { FC } from 'react';

const AboutSection: FC = () => {
  return (
    <section className="flex flex-col gap-y-4 max-lg:col-span-2">
      <h2 className="text-2xl color-primary font-semibold">소개글</h2>
      <section className="flex flex-col gap-y-2 leading-6 break-all color-primary">
        <p>
          4년 차 웹 개발자로, 소규모 조직에서 B2B CRM, VMI 시스템 및 CMS 등 백오피스의
          개발/배포/운영을 해왔습니다. 이 과정에서, 비즈니스 도메인에 맞닿은 영역에서의 데이터 흐름
          처리, 렌더링 전략 구성 등의 시스템 설계 경험을 쌓아왔습니다.
        </p>
        <p>
          TypeScript, React(Next.js) 기반의 프론트엔드를 주로 다루며, 아키텍트, 백엔드, 인프라
          엔지니어링 등 고객 경험 개선에 기여할 수 있는 부분이 있다면 구분 없이 참여하는 것을
          좋아합니다. 최근에는 불필요한 재렌더링 최소화, 번들 사이즈 최적화 등을 통해 다양한 환경의
          고객이 서비스를 원활하게 이용할 수 있도록 프론트엔드 성능 개선에 집중하고 있습니다.
        </p>
        <p>
          더 나아가, 조직 차원의 개발 생산성을 향상시키는 일에 보람을 느낍니다. 표준을 정의하기 위한
          FSD 등의 구조적 컨벤션 도입, 중복 코드 제거 및 공통 모듈 개발, 새로운 기술의 연구/적용 등
          다양한 방법으로 업무 효율을 제고하는 일을 좋아합니다.
        </p>
      </section>
    </section>
  );
};

export default AboutSection;
