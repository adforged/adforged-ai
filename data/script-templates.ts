import type { ScriptTemplate } from "@/types";

export const SCRIPT_TEMPLATES: ScriptTemplate[] = [
  {
    id: "script-template-001",
    name: "Problem-Solution Hook",
    style: "problem-solution",
    template: `Tired of {{problem}}? {{product_name}} is here to change that.

{{product_name}} {{key_benefit}}. No more {{pain_point}}.

With {{feature_1}} and {{feature_2}}, you'll finally {{desired_outcome}}.

Over {{social_proof}} people have already made the switch.

Get yours now at {{brand}}.com. {{cta}}`,
    description: "Start with a relatable problem, present your product as the solution",
    best_for: ["Problem-solving products", "Innovations", "Improvements"],
    example: "Tired of slow wifi? TurboNet is here to change that...",
  },
  {
    id: "script-template-002",
    name: "Social Proof Testimonial",
    style: "testimonial",
    template: `I used to struggle with {{problem}}, until I found {{product_name}}.

Honestly, I was skeptical at first. But after trying it for {{time_period}}, I'm blown away.

{{key_benefit_1}}. {{key_benefit_2}}. And the best part? {{surprise_benefit}}.

If you're dealing with {{problem}}, you need to try this. It's literally {{transformation}}.

Check out {{product_name}} - link in bio. {{cta}}`,
    description: "Authentic testimonial style with personal experience",
    best_for: ["Building trust", "Consumer products", "Lifestyle brands"],
    example: "I used to struggle with dry skin, until I found GlowSerum...",
  },
  {
    id: "script-template-003",
    name: "Product Demo",
    style: "product-demo",
    template: `Let me show you why everyone's obsessed with {{product_name}}.

First, {{feature_1_demo}}. See how easy that was?

Then, {{feature_2_demo}}. Game changer, right?

And here's my favorite part: {{best_feature_demo}}.

You can get all of this for just {{price}}. Worth every penny.

Grab yours at {{brand}}.com. {{cta}}`,
    description: "Demonstrate product features and benefits visually",
    best_for: ["Physical products", "Software", "Tools"],
    example: "Let me show you why everyone's obsessed with the SmartBlender...",
  },
];

export const getScriptTemplateByStyle = (style: string) =>
  SCRIPT_TEMPLATES.filter((t) => t.style === style);
