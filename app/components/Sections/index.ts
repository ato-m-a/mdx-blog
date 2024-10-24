import ProfileSection from './Profile';
import PostSection from './Post';
import AboutSection from './About';
import ExperienceSection from './Experience';

interface IHomeSections {
  Profile: typeof ProfileSection;
  Post: typeof PostSection;
  About: typeof AboutSection;
  Experience: typeof ExperienceSection;
}

const HomeSections: Readonly<IHomeSections> = {
  Profile: ProfileSection,
  Post: PostSection,
  About: AboutSection,
  Experience: ExperienceSection,
} as const;

export default HomeSections;
