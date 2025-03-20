import { ReactNode } from "react";

import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  id,
  name,
  className,
  background,
  Icon,
  description,
  image,
  href,
  cta,
}: {
  name: string;
  id: any;
  className: string;
  background: ReactNode;
  Icon: any;
  image: any;
  description: string;
  href: string;
  cta: string;
}) => (
  <motion.div
    initial={{
      opacity: 0,
      // x: id % 2 === 0 ? -100 : 100
    }}
    whileInView={{
      opacity: 1,
      // x: 0
    }}
    transition={{
      duration: 0.5,
    }}
    viewport={{ once: true }}
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-end overflow-hidden rounded-xl",
      // light styles
      "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-2">
      <Image
        className="mix-blend-multiply object-contain aspect-auto h-16 w-16"
        src={image}
        width={100}
        height={100}
        alt="logo"
      />
      {/* <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" /> */}
      <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
        {name}
      </h3>
      <p className=" w-full text-md line-clamp-2 group-hover:line-clamp-6 text-neutral-400">{description}</p>
    </div>
    {/* 
    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
        <a href={href}>
          {cta}
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div> */}
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 " />
  </motion.div>
);

export { BentoCard, BentoGrid };
