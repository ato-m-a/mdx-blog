import type { FC } from 'react';
import type { WithTrigger } from '@/components/types';
import type { ExperienceSchema } from '@/schema/experience/base.schema';
import type { CompanySchema } from '@/schema/company/base.schema';
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
import ExperienceContainer from './ExperienceContainer';
import ScrollContainer from '@/components/ScrollContainer';
import MDXRenderer from '@/components/MDXRenderer';

type CareerDialogProps = {
  company: CompanySchema;
  experiences: ExperienceSchema[];
} & WithTrigger;

const CareerDialog: FC<CareerDialogProps> = ({ trigger, company, experiences }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>{trigger}</div>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 max-w-[60dvw] max-h-[80dvh] max-lg:max-w-[80dvw] max-lg:max-h-[90dvh] max-md:max-w-full max-md:w-full max-md:max-h-full h-full">
        <DialogHeader className="p-6 w-full text-left">
          <DialogTitle>
            <a
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="animated-underline"
            >
              {company.name}
            </a>
          </DialogTitle>
          <DialogDescription className="color-secondary">{company.description}</DialogDescription>
        </DialogHeader>
        <ExperienceContainer experiences={experiences}>
          <ScrollContainer as="article" className="h-full overflow-y-auto flex-1">
            {experiences.map((experience, index) => (
              <div key={`exp-${index}`} className="pb-10" data-index={index}>
                <MDXRenderer
                  key={experience.id}
                  source={`
                    # 제목
                    ## 소제목1
            
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Quisquam, quos.

                    \`/app.tsx\`
            
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
              </div>
            ))}
          </ScrollContainer>
        </ExperienceContainer>
        <DialogFooter className="p-6">
          <DialogClose asChild>
            <Button>닫기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CareerDialog;
