'use client';

import type { FC } from 'react';
import type { ExperienceSchema } from '@/schema/experience.schema';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Heading, Paragraph } from '@/components/ui/Typography';
import HoverGroup from '@/components/HoverGroup';
import ColorBadge from '@/components/ColorBadge';

type ExperienceDialogProps = Pick<ExperienceSchema, 'company' | 'content'>;

const ExperienceDialog: FC<ExperienceDialogProps> = ({ company }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <HoverGroup as="p" role="button" className="company-label">
            <ColorBadge color={company.brandColor} />
            <span className="company-label__name">{company.name}</span>
          </HoverGroup>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-primary p-0 color-primary border-base overflow-hidden w-[60dvw] max-w-[60dvw] h-[80dvh] max-h-[80dvh] max-lg:max-w-[80dvw] max-lg:w-[80dvw] max-lg:max-h-[90dvh] max-lg:h-[90dvh] max-md:max-w-full max-md:w-full max-md:max-h-full max-md:h-full">
        <DialogHeader className="p-6 w-full bg-primary">
          <DialogTitle>Dialog Demo</DialogTitle>
          <DialogDescription className="color-secondary">
            This is a dialog demo for experience.
          </DialogDescription>
        </DialogHeader>
        <main className="px-6 h-full overflow-y-auto">
          <Heading.h1>제목</Heading.h1>
          <Heading.h2>소제목1</Heading.h2>
          <Paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Quisquam, quos.
          </Paragraph>
          <Paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, quos.
          </Paragraph>
          <Heading.h2>소제목2</Heading.h2>
          <Paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </Paragraph>
          <Paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, quos.
          </Paragraph>
          <Heading.h3>소제목2-1</Heading.h3>
          <Paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam, quos.
          </Paragraph>
          <Heading.h3>소제목2-2</Heading.h3>
          <Paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Quisquam, quos.
          </Paragraph>
          <Paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam, quos.
          </Paragraph>
        </main>
        <DialogFooter className="p-6">
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceDialog;
