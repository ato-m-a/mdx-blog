# Next.js 14 웹 이력서 | 블로그
렌더링/라우팅 및 캐싱 전략에 대한 이해를 강화하고, 기존의 웹 이력서를 블로그 기능으로 확장하는 프로젝트입니다.

`/manage` 경로를 제외하고 ISR 사용한 Full Route Cache 적용하고, [useSearchParams](https://github.com/ato-m-a/mdx-blog/blob/main/common/hooks/useSearchParams.ts) 훅 및 [SearchParamsContext](https://github.com/ato-m-a/mdx-blog/blob/main/common/context/searchParams/index.ts), [SearchParamsProvider](https://github.com/ato-m-a/mdx-blog/blob/main/components/Providers/SearchParamsProvider.tsx) 사용해 URLSearchParams로 fetch에 필요한 전역 상태를 관리합니다.

`/manage` 경로 또한 Static Page로 구현해 middleware를 통해 접근 제어를 수행하고자 하였으나, Edge Runtime에서의 Redis Client 사용 불가 등의 이유로
[Layout](https://github.com/ato-m-a/mdx-blog/blob/main/app/manage/layout.tsx)에서 수행하는 SSR(Dynamic Rendering) 전략을 택하였습니다.

그외 [Next Themes](https://github.com/pacocoursey/next-themes)를 사용해 다크모드 구현, [shadcn/ui](https://github.com/shadcn-ui/ui) 및
[Radix UI](https://www.radix-ui.com) 기반의 Headless UI를 적극 활용하였습니다.

인증/인가에 Redis Cloud 및 Http-Only cookie 기반의 세션 방식을 택하였으나, 아직 개발 중으로 jwt 방식으로 전환한다면 Edge Runtime에서의 jwt 사용을 위한 [jose](https://github.com/panva/jose) 등도 고려해보고 있습니다. 현재의 구현은 [session.ts](https://github.com/ato-m-a/mdx-blog/blob/main/server/trpc/lib/session.ts)을 참고해주세요.

해당 프로젝트를 진행하며 개인적으로 느낀 바로는, `Next.js` 프레임워크가 다양한 렌더링 전략 구현에 있어 높은 편의성을 제공하는 반면, Edge Runtime에서의 제약이나
cache opt-in/out이 자유롭지 않은 점(v15에서 해결되었다고 들었지만, 기본 opt-out으로 변경되어 모든 페이지에 대해 명시적으로 opt-in을 해야 하는 점) 등이 있어,
추후 [Remix](https://github.com/remix-run/remix)(SSR), [Gatsby](https://github.com/gatsbyjs/gatsby)(SSG)와 같은 프레임워크 사용과 함께 별도의 BFF를 구현하는 것도 좋을 것 같다고 생각합니다.

## 목차
- [개발 기간](#개발-기간)
- [개발 환경](#개발-환경)
- [배포 URL](#배포-url)
- [주요 라이브러리](#주요-라이브러리)

## 개발 기간
- ### 2024.10.21 ~ 진행중

## 개발 환경
- OS: [macOS](https://www.apple.com/macos) `15.0.1`
- Runtime: [Node.js](https://github.com/nodejs/node) `v20.16.0`
- Package Manager: [npm](https://github.com/npm/cli) `v10.8.0`
- Deployment: [Vercel](https://vercel.com)

## 배포 URL
> 현재 개발 중으로, 도메인(ato-m-a.me) 연결 전입니다.
- [https://mdx-blog-beta.vercel.app](https://mdx-blog-beta.vercel.app)
- [https://ato-m-a.me](https://ato-m-a.me)

## 주요 라이브러리
- [Next.js](https://github.com/vercel/next.js) `v14`
- [tRPC](https://github.com/trpc/trpc) `v11-rc`
- [TanStack Query](https://github.com/TanStack/query) `v5`
- [React Hook Form](https://github.com/react-hook-form/react-hook-form) `v7`
- [zod](https://github.com/colinhacks/zod) `v3`
- [Next MDX Remote](https://github.com/hashicorp/next-mdx-remote) `v5`
- [Tailwind CSS](https://github.com/tailwindcss/tailwindcss) `v3`
- [Prisma](https://github.com/prisma/prisma) `v5`
