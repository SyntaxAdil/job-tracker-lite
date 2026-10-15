"use client";

import { useState } from "react";
import { FiCheck, FiCopy, FiZap } from "react-icons/fi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AI_PROMPT } from "../constants";
import {
  applicationSchema,
  type applicationInput,
} from "../schema/application-schema";

type Props = { onFill: (data: Partial<applicationInput>) => void };

export function JsonFill({ onFill }: Props) {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const fill = () => {
    // strip code fences
    const clean = text.replace(/```(?:json)?/g, "").trim();

    let json: unknown;
    try {
      json = JSON.parse(clean);
    } catch {
      toast.error("Invalid JSON");
      return;
    }

    const result = applicationSchema.partial().safeParse(json);
    if (!result.success) {
      const issue = result.error.issues[0];
      toast.error(`${issue.path.join(".")}: ${issue.message}`);
      return;
    }

    onFill(result.data);
    toast.success("Form filled");
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(AI_PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <FiZap className="size-4" /> Quick fill
        </CardTitle>
        <CardDescription>
          Copy the prompt, give it to any AI with a job description, then paste
          the JSON here.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Textarea
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='{"companyName": "Acme", "position": "Frontend Developer"}'
          className="font-mono text-xs"
        />
        <div className="flex flex-wrap gap-2">
          <Button type="button" onClick={fill} disabled={!text.trim()}>
            <FiZap /> Fill form
          </Button>
          <Button type="button" variant="outline" onClick={copyPrompt}>
            {copied ? <FiCheck /> : <FiCopy />}
            {copied ? "Copied" : "Copy AI prompt"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
