"use client";

import React, { useState, useCallback } from "react";
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { AlertTriangle, Pipette } from "lucide-react";
import useEyeDropper from "use-eye-dropper";

interface EyeDropperToolProps {
  onColorPicked: (color: string) => void;
}

const EyeDropper: React.FC<EyeDropperToolProps> = ({ onColorPicked }) => {
  const { open, isSupported } = useEyeDropper();
  const [error, setError] = useState<DropperError | undefined>();

  const pickColor = useCallback(async () => {
    try {
      const colorData = await open();
      onColorPicked(colorData.sRGBHex);
    } catch (e) {
      console.log(e);
      if (isNotCanceled(e)) {
        setError(e);
      }
    }
  }, [open, onColorPicked]);
  return (
    <>
      {isSupported() ? (
        <Button
          onClick={pickColor}
          size="md"
          radius="full"
          variant="bordered"
          endContent={<Pipette size={20} />}
        > Eye Dropper</Button>
      ) : (
        <Card className="py-4 w-full">
          <CardHeader className="pb-0 pt-2 px-4 flex items-center justify-center gap-2 font-bold ">
            <h4>EyeDropper API not supported in this browser</h4>
          </CardHeader>
          <CardBody className=" py-2 flex items-center justify-center gap-2">
            <p className="font-bold">Error</p>
            <AlertTriangle
              size={30}
              strokeWidth={1}
              className="text-orange-600"
            />
          </CardBody>
        </Card>
      )}

      {!!error && <div>{error.message}</div>}
    </>
  );
};

type DropperError = {
  message: string;
  canceled?: boolean;
};

const isNotCanceled = (err: DropperError | unknown): err is DropperError => {
  if (err && typeof err === "object" && "message" in err) {
    return true;
  }
  return false;
};

export default EyeDropper;
