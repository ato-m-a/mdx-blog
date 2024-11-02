import type { FC, ReactNode } from 'react';
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
import { Button } from '@/components/ui/button';
import MDXRemote from '@/components/MDXRemote';
import ScrollContainer from '@/components/ScrollContainer';

type ExperienceDialogProps = Pick<ExperienceSchema, 'content'> & {
  trigger: ReactNode;
};

const ExperienceDialog: FC<ExperienceDialogProps> = ({ trigger }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>{trigger}</div>
      </DialogTrigger>
      <DialogContent className="bg-primary color-primary flex flex-col border-base p-0 max-w-[60dvw] max-h-[80dvh] max-lg:max-w-[80dvw] max-lg:max-h-[90dvh] max-md:max-w-full max-md:w-full max-md:max-h-full h-full">
        <DialogHeader className="p-6 w-full bg-primary">
          <DialogTitle>Dialog Demo</DialogTitle>
          <DialogDescription className="color-secondary">
            This is a dialog demo for experience.
          </DialogDescription>
        </DialogHeader>
        <ScrollContainer as="main" className="h-full overflow-y-auto flex-1">
          <MDXRemote
            source={`
              # 제목
              ## 소제목1

              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Quisquam, quos.


              \`\`\`javascript {start:1}{2}
              function greet(name) {
                return \`안녕하세요, \${name}님!\`;
              }
              \`\`\`

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
        </ScrollContainer>
        <DialogFooter className="p-6">
          <DialogClose asChild>
            <Button>닫기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceDialog;
