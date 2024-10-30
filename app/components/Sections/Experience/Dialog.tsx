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
import MDXRemote from '@/components/MDXRemote';
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
      <DialogContent className="bg-primary flex flex-col p-0 color-primary border-base overflow-hidden w-[60dvw] max-w-[60dvw] h-[80dvh] max-h-[80dvh] max-lg:max-w-[80dvw] max-lg:w-[80dvw] max-lg:max-h-[90dvh] max-lg:h-[90dvh] max-md:max-w-full max-md:w-full max-md:max-h-full max-md:h-full">
        <DialogHeader className="p-6 w-full bg-primary">
          <DialogTitle>Dialog Demo</DialogTitle>
          <DialogDescription className="color-secondary">
            This is a dialog demo for experience.
          </DialogDescription>
        </DialogHeader>
        <main className="px-6 h-full overflow-y-auto flex-1">
          <MDXRemote
            source={`
            # 제목
            ## 소제목1

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Quisquam, quos.

            ## 소제목2-1

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, quos.

            ## 소제목2-2

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, quos.

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
            dolor sit amet consectetur adipisicing elit.

            # 제목2

            ## 소제목2-1
            
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. 
          `}
          />
        </main>
        <DialogFooter className="p-6">
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceDialog;
