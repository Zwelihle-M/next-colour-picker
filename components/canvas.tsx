/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  Image,
  Button,
  Input,
  Code,
  Popover,
  PopoverTrigger,

} from "@nextui-org/react";
import { toast } from "sonner";

import { Heading } from "@/components/ui/heading";
import {Container} from "@/components/ui/container";
import EyeDropper from "@/components/eye-dropper";

import { FileImage, UploadCloud } from "lucide-react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { extractColorsFromImage } from "@/lib/color/color-extractor";
import { caranDacheLuminance } from "@/lib/color/colors/caran-d'ache-luminance";

const colorDifference = (color1: string, color2: string): number => {
  const hexToRGB = (hex: string) => {
    const bigint = parseInt(hex.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  const rgb1 = hexToRGB(color1);
  const rgb2 = hexToRGB(color2);

  const diff = Math.sqrt(
    Math.pow(rgb2.r - rgb1.r, 2) +
      Math.pow(rgb2.g - rgb1.g, 2) +
      Math.pow(rgb2.b - rgb1.b, 2)
  );

  return diff;
};

const Canvas = () => {
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<any[]>([]);
  const [options, setOptions] = useState<any>({
    pixels: 64000,
    distance: 0.22,
    saturationDistance: 0.2,
    lightnessDistance: 0.2,
    hueDistance: 0.083333333,
  });
  const [eyedroppercolor, setEyeDropperColor] = useState("00FFFFFF");
  const [matchedColors, setMatchedColors] = useState<any[]>([]);
  const handleOptionChange = (key: string, value: any) => {
    setOptions({
      ...options,
      [key]: value,
    });
  };

  const handleColorPicked = (color: string) => {
    setEyeDropperColor(color);
  };

  const handleCopyColors = async () => {
    await navigator.clipboard.writeText(eyedroppercolor);
    toast.success(`Copied ${eyedroppercolor} to clipboard`);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      const imageURL = URL.createObjectURL(uploadedFile);
      setImage(imageURL);
    }
  };
  useEffect(() => {
    const extractColors = async () => {
      try {
        if (image) {
          const extractedColors = await extractColorsFromImage(image, options);
          console.log("Extracted colors:", extractedColors);
          setColors(extractedColors);
        }
      } catch (error) {
        console.error("Error extracting colors:", error);
      }
    };

    extractColors();
  }, [image, options]);

  useEffect(() => {
    // Compare extracted colors with predefined colors and find the closest match
    const findClosestMatch = () => {
      const matches = colors.map((extractedColor) => {
        let closestMatch = { name: "", hex: "", difference: Infinity };

        caranDacheLuminance.forEach((predefinedColor) => {
          const diff = colorDifference(extractedColor.hex, predefinedColor.hex);
          if (diff < closestMatch.difference) {
            closestMatch = {
              name: predefinedColor.name,
              hex: predefinedColor.hex,
              difference: diff,
            };
          }
        });

        return closestMatch;
      });

      setMatchedColors(matches);
    };

    if (colors.length > 0) {
      findClosestMatch();
    }
  }, [colors]);

  const pdfRef = useRef<HTMLDivElement>(null);

  const downloadPDF = () => {
    const input = pdfRef.current;

    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4", true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;

        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );

        // Generate a unique name based on current date and time
        const currentDate = new Date();
        const fileName = `ExtractedColors_${currentDate
          .toLocaleString()
          .replace(/[\/,:]/g, "-")
          .replace(" ", "_")
          .replace(".", "-")}.pdf`;

        pdf.save(fileName);
      });
    }
  };
  return (
    <Container id="canvas" size={"twoxl"}>
      <Heading
       size={"lg"}
       tracking={"tight"}
       fontWeight={"bold"}
       lineheight={"sm"}
       spacing={"md"}
     >
       Canvas
     </Heading>

     <div className="relative  pt-14 " ref={pdfRef}>
       

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {" "}
          <Card
            isBlurred
            shadow="sm"
            className="border-none bg-background/60 dark:bg-default-100/50"
          >
            <CardBody>
              <div className="mb-5 ">
                <input
                  onChange={handleFileInput}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="upload"
                />
                <label htmlFor="upload">
                  <Button
                    as="span"
                    size="md"
                    radius="full"
                    variant="bordered"
                    endContent={<UploadCloud size={20} />}
                  >
                    Upload Image
                  </Button>
                </label>
              </div>
              <div className="mb-10">
                <Input
                  variant="bordered"
                  type="number"
                  label="Pixel Amount"
                  labelPlacement="outside"
                  value={options.pixels}
                  onChange={(e) =>
                    handleOptionChange("pixels", +e.target.value)
                  }
                />
              </div>
              <div className="mb-10">
                <Input
                  type="number"
                  label="Color Distance"
                  labelPlacement="outside"
                  step="0.01"
                  min="0"
                  max="1"
                  value={options.distance}
                  onChange={(e) =>
                    handleOptionChange("distance", +e.target.value)
                  }
                  variant="bordered"
                />
              </div>
              <div className="mb-10">
                <Input
                  type="number"
                  label="Hue Distance"
                  labelPlacement="outside"
                  step="0.01"
                  min="0"
                  max="1"
                  value={options.hueDistance}
                  onChange={(e) =>
                    handleOptionChange("hueDistance", +e.target.value)
                  }
                  variant="bordered"
                />
              </div>
              <div className="mb-10">
                <Input
                  type="number"
                  label="Saturation Distance"
                  labelPlacement="outside"
                  step="0.01"
                  min="0"
                  max="1"
                  value={options.saturationDistance}
                  onChange={(e) =>
                    handleOptionChange("saturationDistance", +e.target.value)
                  }
                  variant="bordered"
                />
              </div>
              <div className="mb-10">
                <Input
                  type="number"
                  label="Lightness Distance"
                  labelPlacement="outside"
                  step="0.01"
                  min="0"
                  max="1"
                  value={options.lightnessDistance}
                  onChange={(e) =>
                    handleOptionChange("lightnessDistance", +e.target.value)
                  }
                  variant="bordered"
                />
              </div>

              {/* TODO: Extremely bugged breaks scroll feature on page */}

              <div className="mb-10 flex gap-1">
                <EyeDropper onColorPicked={handleColorPicked} />{" "}
                <Popover placement="right">
                  <PopoverTrigger style={{ backgroundColor: eyedroppercolor }}>
                    <Button
                      as="span"
                      size="md"
                      radius="full"
                      variant="bordered"
                      className="text-white"
                      onClick={handleCopyColors}
                    >
                      {eyedroppercolor}
                    </Button>
                  </PopoverTrigger>
                  =
                </Popover>
              </div>
            </CardBody>
          </Card>
          <Card
            isBlurred
            shadow="sm"
            className="border-none bg-background/60 dark:bg-default-100/50"
            isPressable={true}
          >
            <CardBody className="flex items-center justify-center overflow-visible">
              {image ? (
                <Image src={image} alt="user uploaded" className="rounded-xl" />
              ) : (
                <FileImage size={32} />
              )}
            </CardBody>
          </Card>
        </div>

        <div className="w-full mb-10">
          <Heading
            size={"sm"}
            tracking={"tight"}
        
            className="mb-5"
          >
            Extracted Colors
          </Heading>
          <Card
            isBlurred
            shadow="sm"
            className="border-none bg-background/60 dark:bg-default-100/50"
          >
            <CardBody>
              <div className="md:col-span-2 rounded-lg mb-10">
                <div className="flex flex-wrap justify-between gap-3 p-2">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center mb-4"
                    >
                      <div
                        className="rounded-full border"
                        style={{
                          backgroundColor: color.hex,
                          width: "40px",
                          height: "40px",
                        }}
                      ></div>
                      <p className="text-sm mt-2">
                        Hex: {color.hex}
                        <br />
                        {/* RGB:{" "}
                        {color.red !== undefined &&
                        color.green !== undefined &&
                        color.blue !== undefined
                          ? `(${color.red}, ${color.green}, ${color.blue})`
                          : "N/A"} */}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* luminace */}
        <div className="w-full mb-10">
          <Heading
            size={"sm"}
            tracking={"tight"}
         
            className="mb-5"
          >
            Caran D'ache Luminance
          </Heading>
          <Card
            isBlurred
            shadow="sm"
            className="border-none bg-background/60 dark:bg-default-100/50"
          >
            <CardBody>
              <div className="md:col-span-2 rounded-lg mb-10">
                <div className="p-2">
                  {matchedColors.map((match, index) => (
                    <div key={index}>
                      <p>
                        Extracted Color:{" "}
                        <div
                          style={{
                            backgroundColor:
                              colors[index]?.hex || "transparent",
                            width: "40px",
                            height: "40px",
                          }}
                          className="rounded-full border"
                        ></div>
                      </p>

                      {match.name ? (
                        <div className="mb-5">
                          <p>Closest Match:{match.name}</p>

                          <p className="mb-2">
                            <Code>{match.hex}</Code>
                          </p>
                          <div
                            style={{
                              backgroundColor: match.hex,
                              width: "40px",
                              height: "40px",
                            }}
                            className="rounded-full border pt-2"
                          ></div>
                        </div>
                      ) : (
                        <p>No Match Found</p>
                      )}

                      <hr />
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* prisma */}
        <div className="w-full mb-10">
          <Heading
            size={"sm"}
    
            className="mb-5"
          >
            Premier Soft Core Colored Pencils
          </Heading>
          <Card
            isBlurred
            shadow="sm"
            className="border-none bg-background/60 dark:bg-default-100/50"
            isDisabled={true}
            isPressable={true}
          >
            <CardBody>Comming Soon</CardBody>
          </Card>
        </div>
        {/* poloychromos */}
        <div className="w-full mb-10">
          <Heading
            size={"sm"}
            tracking={"tight"}
           
            className="mb-5"
          >
            Polychromos Artists‘ Colour Pencils
          </Heading>
          <Card
            isBlurred
            shadow="sm"
            className="border-none bg-background/60 dark:bg-default-100/50"
            isDisabled={true}
            isPressable={true}
          >
            <CardBody>Comming Soon</CardBody>
          </Card>
        </div>

        <div className="flex justify-center items-center pt-5 pb-20">
          <Button
            onClick={downloadPDF}
            size="lg"
            radius="full"
            variant="bordered"
          >
            Download PDF
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Canvas;

