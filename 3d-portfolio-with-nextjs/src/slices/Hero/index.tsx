'use client';

import { useEffect, useRef } from "react";

import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import gsap from "gsap";
import Bounded from "@/components/Bounded";
/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {

  const component = useRef(null);

  useEffect(() => {
     // create as many GSAP animations and/or ScrollTriggers here as you want...
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(".name-animation", {
        x: -100, opacity: 0, rotate: -10
      }, {
        x: 0, opacity: 1, rotate: 0, duration: 1, ease: "elastic.out(1, 0.3)", transformOrigin: "left top",
        stagger: { each: 0.1, from: "random" }
      });

      tl.fromTo(".job-title", {
        y: 20, opacity: 0, scale:1.2
      }, {
        y: 0, opacity: 1,scale:1, duration: 1, ease: "elastic.out(1, 0.3)"
      });
    }, component);

    return () => ctx.revert(); // cleanup!
  }, []);

  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;

    return name.split("").map((letter, index) => (
      <span key={key + index} className={`name-animation name-animation-${key} inline-block opacity-0`}>
        {letter}
      </span>
    ));
  }

  return (

    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid min-h-[70w] grid-cols-1 md:grid-cols-2 items-center">
        <div className="col-start-1 md:row-start-1">

          <h1 className="mb-8 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter"
            aria-label={slice.primary.first_name + " " + slice.primary.last_name}>
            <span className="block text-slate-300">
              {/* {slice.primary.first_name} */}
              {renderLetters(slice.primary.first_name, "first_name")}
            </span>
            <span className="-mt-[.2rem] block text-slate-500">
              {/* {slice.primary.last_name} */}
              {renderLetters(slice.primary.last_name, "last_name")}
            </span>
          </h1>
          <span className="job-title block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-2xl font-bold uppercase text-transparent opacity-0 md:text-4xl">
            {slice.primary.tag_line}
          </span>
        </div>

      </div>
    </Bounded>
  );
};

export default Hero;
