import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Marquee3D from "@/components/marquee";
import Video from "@/components/video";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Make&nbsp;</span>
        <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
        <br />
        <span className={title()}>
          portfolios without coding and problems.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Beautiful, cheap and modern Next.js templates.
        </div>
      </div>

      <div className="flex gap-3 mb-[4rem]">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={'/templates'}
        >
          Get Started
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <div className="flex justify-between gap-[20px] items-stretch mb-[4rem]">
        <div className='relative w-full md:w-[70%] h-[30rem] md:h-[40rem] dark:border-none border shadow-xl'>
          <div
            className="absolute top-0 left-0 h-full content-[''] z-10 pointer-events-none bg-[url('https://res.cloudinary.com/dzl9yxixg/image/upload/noise_yvdidf.gif')]"
            style={{ opacity: 0.8 }}
          ></div>
          <section className='  font-semibold h-full bg-gradient-to-t dark:to-gray-800 dark:from-gray-950 to-[#dadada] from-[#ebebeb] flex flex-col items-center justify-center dark:text-white text-black'>
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:35px_34px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

            <h1 className='2xl:text-[55px] text-2xl xs:text-3xl sm:text-4xl md:text-3xl lg:text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]'>
              10+ Free Templaets. Choose One Of Them And Enter Your Details. 
            </h1>
          </section>
        </div>
        <Marquee3D />
      </div>

      <div className="w-full">
        <h1 className="text-4xl md:text-6xl w-full text-left font-bold mb-[1rem] sm:mb-[2rem] md:mb-[3rem]">Tutorial</h1>
        <Video />
      </div>
    </section>
  );
}
