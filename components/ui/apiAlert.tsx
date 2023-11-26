"use client";

import React from "react";
import { Copy, Server } from "lucide-react";
import toast from "react-hot-toast";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";

interface Props {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const TEXT_MAP: Record<Props["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const VARIANT_MAP: Record<Props["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert: React.FC<Props> = ({
  title,
  description,
  variant = "public",
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("API route copied to the clipboard");
  };

  return (
    <Alert>
      <Server className="h-4 w-4" />

      <AlertTitle className="flex items-center gap-2">
        {title}
        <Badge variant={VARIANT_MAP[variant]}>{TEXT_MAP[variant]}</Badge>
      </AlertTitle>

      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>

        <Button variant="outline" size="sm" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
