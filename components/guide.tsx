"use client";

import React from "react";
import { Heading } from "@/components/ui/heading";
import {Container} from "@/components/ui/container";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Tooltip, Button } from "@nextui-org/react";
const UserGuide = () => {
  return (
    <Container id="guide">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <Heading
         
          size="lg"
          fontWeight="bold"
          tracking={"wide"}
          className="mb-10"
        >
          Guide
        </Heading>

        <Heading size={"sm"} tracking={"tight"}>
          Config
        </Heading>

        <Accordion
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                height: "auto",
                transition: {
                  height: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    duration: 1,
                  },
                  opacity: {
                    easings: "ease",
                    duration: 1,
                  },
                },
              },
              exit: {
                y: -10,
                opacity: 0,
                height: 0,
                transition: {
                  height: {
                    easings: "ease",
                    duration: 0.25,
                  },
                  opacity: {
                    easings: "ease",
                    duration: 0.3,
                  },
                },
              },
            },
          }}
        >
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title="Pixel Amount"
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  height: "auto",
                  transition: {
                    height: {
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      duration: 1,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 1,
                    },
                  },
                },
                exit: {
                  y: -10,
                  opacity: 0,
                  height: 0,
                  transition: {
                    height: {
                      easings: "ease",
                      duration: 0.25,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 0.3,
                    },
                  },
                },
              },
            }}
          >
            {/* Total pixel number of the resized picture for calculation. Fewer
            pixels will produce a rougher but faster result. More pixels will
            produce a more accurate but slower result. Image resolution is
            typically described in PPI, which refers to how many pixels are
            displayed per inch of an image. Higher resolutions mean that there
            more pixels per inch PPI, resulting in more pixel information and
            creating a high-quality, crisp image. */}
            The total number of pixels in a resized picture affects the
            calculation. Fewer pixels mean a quicker but rougher result, while
            more pixels mean a slower but more accurate result. Image resolution
            is often measured in PPI (pixels per inch). Higher resolutions, with
            more pixels per inch (PPI), create sharper and higher-quality
            images.
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            title="Color Distance"
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  height: "auto",
                  transition: {
                    height: {
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      duration: 1,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 1,
                    },
                  },
                },
                exit: {
                  y: -10,
                  opacity: 0,
                  height: 0,
                  transition: {
                    height: {
                      easings: "ease",
                      duration: 0.25,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 0.3,
                    },
                  },
                },
              },
            }}
          >
            {/* Color distance to not have near colors (1 distance is between white
            and black). Less distance will produce a faster result with less
            colors. More distance will produce more precise colors but slower
            result. Color distance, also known as color difference, gives a
            measure of visual, perceptual color differences. Perceptually
            similar colors have smaller distance. ColorDistance computes the
            distance between two colors as the Euclidean distance between the
            two color vectors in the LABColor space. */}
            The color distance determines how different colors are from each
            other. A smaller distance results in faster processing with fewer
            colors, while a larger distance provides more precise colors but
            slower processing. Color distance measures the visual difference
            between colors, with perceptually similar colors having a smaller
            distance. It's calculated using the Euclidean distance between color
            vectors in the LABColor space.
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="Accordion 3"
            title="Hue Distance"
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  height: "auto",
                  transition: {
                    height: {
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      duration: 1,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 1,
                    },
                  },
                },
                exit: {
                  y: -10,
                  opacity: 0,
                  height: 0,
                  transition: {
                    height: {
                      easings: "ease",
                      duration: 0.25,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 0.3,
                    },
                  },
                },
              },
            }}
          >
            {/* Minimum hue value between two colors otherwise the colors will be
            merged. Hue distance is a value used to calculate the difference
            between colors. It's often measured in degrees, ranging from 0° to
            360°.Hue is the color of a point on the color wheel or along the
            spectrum. It's also the wavelength in the visible light spectrum
            where the energy output from a source is the greatest */}
            The minimum hue value between two colors prevents them from merging.
            Hue distance measures the difference between colors, typically in
            degrees from 0° to 360° on the color wheel. Hue represents the
            color's position on the spectrum and its wavelength in the visible
            light spectrum, indicating the dominant energy output.
          </AccordionItem>
          <AccordionItem
            key="4"
            aria-label="Accordion 4"
            title="Saturation Distance"
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  height: "auto",
                  transition: {
                    height: {
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      duration: 1,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 1,
                    },
                  },
                },
                exit: {
                  y: -10,
                  opacity: 0,
                  height: 0,
                  transition: {
                    height: {
                      easings: "ease",
                      duration: 0.25,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 0.3,
                    },
                  },
                },
              },
            }}
          >
            {/* Minimum saturation value between two colors otherwise the colors
            will be merged. Saturation describes the intensity of the colour.
            And lightness refers to how light or dark the colour is. A grayscale
            or black-and-white photo has no colour saturation, while a
            full-colour photo of a field of sunlit wildflowers might be
            extremely saturated. */}
            The minimum saturation value between two colors prevents them from
            merging. Saturation indicates the intensity of a color, while
            lightness refers to how light or dark it is. A grayscale or
            black-and-white photo has no color saturation, while a fully
            saturated photo might depict vivid, intense colors, like a field of
            sunlit wildflowers.
          </AccordionItem>
          <AccordionItem
            key="5"
            aria-label="Accordion 4"
            title="Lightness Distance"
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  height: "auto",
                  transition: {
                    height: {
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      duration: 1,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 1,
                    },
                  },
                },
                exit: {
                  y: -10,
                  opacity: 0,
                  height: 0,
                  transition: {
                    height: {
                      easings: "ease",
                      duration: 0.25,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 0.3,
                    },
                  },
                },
              },
            }}
          >
            {/* Minimum lightness value between two colors otherwise the colors will
            be merged. This is due to the inverse-square law which states that
            the intensity of an emitted light or energy is inversely
            proportional to the square of the distance from the source. So, as
            the distance increases, the brightness of an image decreases and as
            the distance decreases, the brightness of an image increases. */}
            The minimum lightness value between two colors prevents them from
            merging. This is influenced by the inverse-square law, which states
            that the brightness of light or energy decreases as the distance
            from the source increases. In other words, as the distance
            increases, the image appears dimmer, and as the distance decreases,
            the image appears brighter.
          </AccordionItem>

          <AccordionItem
            key="6"
            aria-label="Accordion 5"
            title="Eye Dropper "
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  height: "auto",
                  transition: {
                    height: {
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      duration: 1,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 1,
                    },
                  },
                },
                exit: {
                  y: -10,
                  opacity: 0,
                  height: 0,
                  transition: {
                    height: {
                      easings: "ease",
                      duration: 0.25,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 0.3,
                    },
                  },
                },
              },
            }}
          >
            {/* The Eyedropper tool can sample colors from anywhere in an image and
            add them to your Swatches panel */}
            The Eyedropper tool lets you pick colors from any part of an image
            and add them to your Swatches panel.Please note this tool is only
            available for Chrome and Firefox.
          </AccordionItem>
        </Accordion>
        <span>
          <Tooltip
            className="capitalize text-white"
            color="warning"
            content="Please note The eye dropper breaks the scrolling,you'll have to manually scroll once you've used it. We're working on fixing this issue"
          >
            <Button variant="flat" className="capitalize">
              Proceed?
            </Button>
          </Tooltip>
        </span>

      </div>
    </Container>
  );
};

export default UserGuide;

