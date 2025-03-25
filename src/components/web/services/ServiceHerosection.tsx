"use client";
import { useRef } from "react";
import Ripple from "../../../components/magicui/ripple";
import { servicesData } from "@/constants/data";
import { AnimatedBeam } from "../../magicui/animated-beam";
import Product from "./Product";

export function ServiceHerosection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);
  const div8Ref = useRef<HTMLDivElement>(null);
  const div9Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex flex-col h-full w-full items-center justify-center "
      ref={containerRef}
    >
      <div className="flex size-full flex-col max-w-full max-h-[200px] items-stretch justify-center gap-10">
        <div className="flex flex-row items-center justify-around">
          <Product ref={div1Ref} {...servicesData.springBoot} />
          <Product ref={div3Ref} {...servicesData.muleSoft} />
        </div>
        <div className="flex flex-row items-center justify-between">
          <Product ref={div4Ref} {...servicesData.marketingCloud} />
          <Product ref={div5Ref} {...servicesData.dx} />
          <Product ref={div6Ref} {...servicesData.node} />
        </div>
        <div className="flex flex-row items-center justify-around">
          <Product ref={div7Ref} {...servicesData.commerceCloud} />
          <Product ref={div9Ref} {...servicesData.react} />
        </div>
      </div>
      <Ripple />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div1Ref}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div2Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div3Ref}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div6Ref}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div7Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div8Ref}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div9Ref}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
      />
    </div >
  );
}


