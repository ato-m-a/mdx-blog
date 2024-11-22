import type { NextRequest } from 'next/server';
import { ImageResponse } from 'next/og';
import path from 'path';
import fs from 'fs/promises';

type FileSegment = 'fonts' | 'images';
type Params = { pathname: string };
type Options = { params: Params };

const createPath = (seg: FileSegment, filename: string) =>
  path.join(process.cwd(), 'assets', seg, filename);

export const GET = async (
  { nextUrl: { searchParams } }: NextRequest,
  { params: { pathname } }: Options,
) => {
  /** properties */
  const title = searchParams.get('title') ?? '홍준혁 | 웹 프론트엔드 개발자';
  const subtitle = searchParams.get('subtitle');
  const theme = searchParams.get('theme') ?? 'light';

  /** define size */
  const width = searchParams.get('width') ?? '1200';
  const height = searchParams.get('height') ?? '630';

  /** style properties */
  const textPrimary = theme === 'dark' ? '#F4F4F5' : '#18181B';
  const textSecondary = theme === 'dark' ? '#A1A1AA' : '#424242';
  const backgroundColor = theme === 'dark' ? '#18181B' : '#F4F4F5';

  /** font */
  const pretendardSemiBold = await fs.readFile(createPath('fonts', 'Pretendard-SemiBold.ttf'));
  const pretendardBold = await fs.readFile(createPath('fonts', 'Pretendard-Bold.ttf'));
  const bricolageGrotesqueSemiBold = await fs.readFile(
    createPath('fonts', 'BricolageGrotesque-SemiBold.ttf'),
  );
  const jetBrainsMonoSemiBold = await fs.readFile(
    createPath('fonts', 'JetBrainsMono-SemiBold.ttf'),
  );

  /** avatar image */
  const avatarBuffer = await fs.readFile(createPath('images', 'avatar.png'));

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          backgroundColor,
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <p
            style={{
              fontFamily: 'Bricolage Grotesque-SemiBold, Pretendard-SemiBold',
              fontSize: '34px',
              color: textPrimary,
              textTransform: 'capitalize',
              margin: '0 0 24px 0',
            }}
          >
            {pathname}
          </p>
          <h1
            style={{
              fontFamily: 'Pretendard-Bold',
              fontSize: '52px',
              color: textPrimary,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              margin: 0,
            }}
          >
            {title.replaceAll(/\\n/g, '\n')}
          </h1>
          {subtitle && (
            <h2
              style={{
                fontFamily: 'Pretendard-SemiBold',
                fontSize: '24px',
                color: textSecondary,
                margin: '16px 0 0 0',
              }}
            >
              {subtitle}
            </h2>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            position: 'relative',
            gap: '32px',
          }}
        >
          <span
            style={{ fontFamily: 'JetBrains Mono-SemiBold', color: textPrimary, fontSize: '26px' }}
          >
            ato-m-a.me
          </span>
          <img
            src={`data:image/png;base64,${avatarBuffer.toString('base64')}`}
            style={{
              position: 'absolute',
              right: '-80px',
              bottom: '-80px',
              width: '425px',
              height: '425px',
            }}
          />
        </div>
      </div>
    ),
    {
      width: parseInt(width),
      height: parseInt(height),
      fonts: [
        {
          name: 'Bricolage Grotesque-SemiBold',
          data: bricolageGrotesqueSemiBold,
          weight: 600,
          style: 'normal',
        },
        {
          name: 'Pretendard-SemiBold',
          data: pretendardSemiBold,
          weight: 600,
          style: 'normal',
        },
        {
          name: 'Pretendard-Bold',
          data: pretendardBold,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'JetBrains Mono-SemiBold',
          data: jetBrainsMonoSemiBold,
          weight: 600,
          style: 'normal',
        },
      ],
    },
  );
};
