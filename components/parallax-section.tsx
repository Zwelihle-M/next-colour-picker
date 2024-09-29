"use client"

import React, { useRef } from "react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import iphoneMockup from "@/public/iphone-mockup.png"

const ParallaxSection = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);


  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log(latest);
  });
  return (
    <Container size={"twoxl"} className="pt-8 pb-20 md:pb-10">
    <div

    // container div
    >
      <div className="md:flex items-center">
         {/* Image section */}
         <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
          <motion.img
            src={iphoneMockup.src}
            alt="Blue cloud"
            width={500}
            height={500}
            
            className="md:absolute h-full md:w-auto md:max-w-none md:-left-6"
            style={{
              translateY: translateY,
            }}
          />
            
        </div>
        {/* Text section */}
        <div className="md:[478px]">
          <div className="text-sm inline-flex  px-3 py-1 rounded-lg text-gray-600 ">
           
          </div>
          <Heading
            size={"lg"}
            tracking={"tighter"}
            fontWeight={"bold"}
            className="mt-6"
          >
            Just Like <br />
            That!
          </Heading>
          <p className="text-xl tracking-tighter mt-6">
           Upload your images and let Next Colour Picker do the magic! 
          </p>
          <p>
          {/* <Breadcrumbs size="lg" radius="full" className="text-xl" >
            <BreadcrumbItem>Upload image</BreadcrumbItem>
            <BreadcrumbItem> Setup Config</BreadcrumbItem>
            <BreadcrumbItem>Extract colors</BreadcrumbItem>
            <BreadcrumbItem>Download PDF</BreadcrumbItem>
          </Breadcrumbs> */}
          </p>
        </div>
       
      </div>
    </div>
  </Container>
  )
}

export default ParallaxSection