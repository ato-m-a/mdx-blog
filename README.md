# MDX Blog
Web front-end blog and portfolio (2025-2026)

## Deployed URL

### [https://ato-m-a.me](https://ato-m-a.me)

## Index
- [Project Structure](#Project-Structure)
- [Page Routes](#Page-Routes)
- [Run Project](#Run-Project)
- [Colophon](#Colophon)
- [About Project](#About-Project)

## Project Structure

```bash
├── app
│   ├── api             # API routes for tRPC and serving dynamic opengraph images.
│   └── ...             # routes and feature-based codes (components, etc...)
├── assets              # static assets (fonts, images)
├── common              # global shared codes
│   ├── context         # global shared context (React.context)
│   ├── events          # global shared events object (using rxjs)
│   ├── ...
│   ├── trpc            # tRPC server and client side implementation
│   └── utils           # global shared utility functions
├── components          # global shared components
│   ├── ...
│   ├── MDXRenderer     # MDX-like renderer component
│   │   ├── client.tsx  # client side implementation (using @mdx-js/mdx)
│   │   └── server.tsx  # server side implementation (using next-mdx-remote)
│   ├── ui              # UI components (@shadcn/ui)
│   └── MarkdownEditor  # Markdown editor component (using codemirror)
├── config              # Webpack config
├── ...
├── schema              # zod schemas
│   └── ...             # domain specific schemas
└── server              # server side codes using tRPC
```

## Page Routes

```bash
└── / # root page
    ├── /posts # 포스트
    │   └── /posts/[:slug] # 포스트 > 포스트 상세
    └── /manage # 관리
            ├── /manage/career # 관리 > 이력
            │   ├── /manage/career/create # 관리 > 이력 > 신규 이력 작성
            │   └── /manage/career/[:id]  # 관리 > 이력 > 개별 이력 관리
            └── /manage/post # 관리 > 포스트 관리
                ├── /manage/post/create # 관리 > 포스트 > 신규 포스트 작성
                └── /manage/post/update
                    └── /manage/post/update/[:id] # 관리 > 포스트 > 개별 
```

## Run Project

> [!NOTE]
> You can use [nvm](https://github.com/nvm-sh/nvm) to manage node versions.

```bash
# use node version manager.
nvm use

# install dependencies.
npm install
npm i

# clean install
npm ci

# run project with hot-reloading.
npm run dev

# build project and run with production mode.
npm run build && npm run start

# build project and export bundle analysis.
npm run analyze:html
npm run analyze:json

# prisma migration
npm run prisma:migrate:draft
npm run prisma:migrate:deploy

# after prisma migration, run this command to generate prisma client.
npm run prisma:generate

# run prisma studio (GUI)
npm run prisma:studio
```

## Colophon

### Language
- [TypeScript](https://www.typescriptlang.org/)

### Engines
- [Node.js](https://nodejs.org/)`v20.16.0`
- [Yarn](https://yarnpkg.com/)`v1.22.19`

### Framework & Library
- [Next.js](https://github.com/vercel/next.js)`v14.2.5` - for building user interfaces, which based on React.
- [React Hook Form](https://github.com/react-hook-form/react-hook-form)`v7.53.1` - for efficient form handling.
- [zod](https://github.com/colinhacks/zod)`v3.23.8` - for data validation at runtime. it helps enforce consistency in the implementation of validation logic.
- [date-fns](https://github.com/date-fns/date-fns) - for date formatting and parsing, whcih is using with [@toss/date](https://github.com/toss/date)`v1.2.0`.
- [Tailwind CSS](https://github.com/tailwindcss/tailwindcss)`v3.4.11` - for styling, which based on utility-first approach.
- [tRPC](https://github.com/trpc/trpc)`v11.0.0-rc.528` - for building remote procedures.
  - consider to switch to Next.js [server actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [prisma](https://github.com/prisma/prisma)`v5.21.1` - for database ORM.
- [@tanstack/react-query](https://github.com/TanStack/query)`v5.59.16` - for data fetching and caching.
- [@shadcn/ui](https://ui.shadcn.com/) - for UI components.
- [@uiw/react-codemirror](https://github.com/uiwjs/react-codemirror)`v4.23.6` - for code editor component.

### Deployment
> [!NOTE]
> currently running on Vercel, But considering building a self-hosted environment based on Amazon AWS.

- [Vercel](https://vercel.com)

## About Project

렌더링/라우팅 및 캐싱 전략에 대한 이해를 강화하고, 기존의 웹 이력서를 블로그 기능으로 확장하는 프로젝트입니다.

### 개발 기간
- 2024.10.21 ~ 2024.12.19 `Released v1.0.0`

### 구현 내용

- `/manage` 경로를 제외하고 ISR 사용한 Full Route Cache를 적용하고, [useSearchParams](https://github.com/ato-m-a/mdx-blog/blob/main/common/hooks/useSearchParams.ts) 훅 및 [SearchParamsContext](https://github.com/ato-m-a/mdx-blog/blob/main/common/context/searchParams/index.ts), [SearchParamsProvider](https://github.com/ato-m-a/mdx-blog/blob/main/components/Providers/SearchParamsProvider.tsx) 사용해 URLSearchParams로 fetch에 필요한 전역 상태를 관리합니다.
- `/manage` 경로 또한 Static Page로 구현해 middleware를 통해 접근 제어를 수행하고자 하였으나, Edge Runtime에서의 Redis Client 사용 불가 등의 이유로
[Layout](https://github.com/ato-m-a/mdx-blog/blob/main/app/manage/layout.tsx)에서 수행하는 SSR(Dynamic Rendering) 전략을 택하였습니다.
- 그외 [Next Themes](https://github.com/pacocoursey/next-themes)를 사용해 다크모드 구현, [shadcn/ui](https://github.com/shadcn-ui/ui) 및
[Radix UI](https://www.radix-ui.com) 기반의 Headless UI를 적극 활용하였습니다.
- 인증/인가에 Redis Cloud 및 Http-Only cookie 기반의 세션 방식을 택하였으나, 아직 개발 중으로 jwt 방식으로 전환한다면 Edge Runtime에서의 jwt 사용을 위한 [jose](https://github.com/panva/jose) 등도 고려해보고 있습니다. 현재의 구현은 [session.ts](https://github.com/ato-m-a/mdx-blog/blob/main/server/trpc/lib/session.ts)을 참고해주세요.

### What I Learned

해당 프로젝트를 진행하며 개인적으로 느낀 바로는, `Next.js` 프레임워크가 다양한 렌더링 전략 구현에 있어 높은 편의성을 제공하는 반면, Edge Runtime에서의 제약이나
cache opt-in/out이 자유롭지 않은 점(v15에서 해결되었다고 들었지만, 기본 opt-out으로 변경되어 모든 페이지에 대해 명시적으로 opt-in을 해야 하는 점) 등이 있어,
추후 [Remix](https://github.com/remix-run/remix)(SSR), [Gatsby](https://github.com/gatsbyjs/gatsby)(SSG)와 같은 프레임워크 사용과 함께 별도의 BFF를 구현하는 것도 좋을 것 같다고 생각합니다.

### 개발 환경
- OS: [macOS](https://www.apple.com/macos) `15.0.1`
- Runtime: [Node.js](https://github.com/nodejs/node) `v20.16.0`
- Package Manager: [npm](https://github.com/npm/cli) `v10.8.0`
- Deployment: [Vercel](https://vercel.com)