"use client";

import React, { useRef } from "react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import HeroImage from "@/public/hero-image.png";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log(latest);
  });
  return (
    <Container id="home" size={"twoxl"}>
      <div
        className="absolute inset-x-0 -top-40  transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div className="relative bg-gradient-to-tr from-razzmatazz  to-mediumpurple left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2  sm:left-[calc(50%-30rem)]  sm:w-[36rem] rounded-full  opacity-70" />
      </div>
      <div className="grid  py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <Heading
            size={"lg"}
            tracking={"tight"}
            fontWeight={"bold"}
            lineheight={"sm"}
            spacing={"md"}
          >
            Next artist colour
            <br />
            pencil picker
          </Heading>
          <p className="max-w-2xl mb-6 lg:mb-8 md:text-lg lg:text-xl">
            Upload your pictures and watch as we extract their colors,
            effortlessly pairing them with a selection of curated shades.
            Experience the elegance of color harmony, making every image shine
            with a touch of sophistication
          </p>
          <Link href="#guide">
            <Button size="lg" radius="full" variant="bordered">
              Get started
            </Button>
          </Link>
        </div>
        {/* image */}
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <motion.img
            src={HeroImage.src}
            alt="hero image"
            className=""
            style={{
              translateY: translateY,
            }}
          />
        </div>

        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-50 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[50rem] -translate-x-1/2 bg-gradient-to-tr from-razzmatazz to-mediumpurple  sm:left-[calc(50%+36rem)] sm:w-[36rem] rounded-full opacity-70" />
        </div>
      </div>
    </Container>
  );
};

export default Hero;
