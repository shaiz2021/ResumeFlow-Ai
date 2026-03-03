import { Template } from "@/data/templates";

// Each template gets a visually distinct preview based on its style
const TemplatePreview = ({ template }: { template: Template }) => {
  const { style } = template;

  if (style === "Corporate") {
    return (
      <div className="space-y-3 p-1">
        <div className="h-5 w-36 rounded bg-foreground/15" />
        <div className="h-2 w-48 rounded bg-muted-foreground/10" />
        <div className="h-[1px] bg-foreground/20 my-2" />
        <div className="space-y-2">
          <div className="h-3 w-24 rounded bg-foreground/12" />
          <div className="h-2 w-full rounded bg-muted-foreground/8" />
          <div className="h-2 w-5/6 rounded bg-muted-foreground/8" />
          <div className="h-2 w-4/6 rounded bg-muted-foreground/8" />
        </div>
        <div className="h-[1px] bg-foreground/20 my-2" />
        <div className="space-y-2">
          <div className="h-3 w-20 rounded bg-foreground/12" />
          <div className="h-2 w-full rounded bg-muted-foreground/8" />
          <div className="h-2 w-3/4 rounded bg-muted-foreground/8" />
        </div>
      </div>
    );
  }

  if (style === "Creative") {
    return (
      <div className="flex gap-3 p-1">
        <div className="w-1/3 space-y-3">
          <div className="w-12 h-12 rounded-full bg-secondary/20 mx-auto" />
          <div className="h-3 w-full rounded bg-secondary/15" />
          <div className="h-2 w-4/5 rounded bg-muted-foreground/10 mx-auto" />
          <div className="space-y-1.5 mt-3">
            <div className="h-2 w-full rounded-full bg-secondary/12" />
            <div className="h-2 w-4/5 rounded-full bg-secondary/12" />
            <div className="h-2 w-3/5 rounded-full bg-secondary/12" />
          </div>
          <div className="space-y-1 mt-2">
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary/30" />
                <div className="h-1.5 flex-1 rounded bg-muted-foreground/8" />
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/3 space-y-3">
          <div className="h-4 w-32 rounded bg-foreground/10" />
          <div className="h-2 w-full rounded bg-muted-foreground/8" />
          <div className="h-2 w-5/6 rounded bg-muted-foreground/8" />
          <div className="border-l-2 border-secondary/30 pl-3 mt-3 space-y-2">
            <div className="h-3 w-28 rounded bg-foreground/10" />
            <div className="h-2 w-full rounded bg-muted-foreground/8" />
            <div className="h-2 w-3/4 rounded bg-muted-foreground/8" />
          </div>
          <div className="border-l-2 border-secondary/30 pl-3 mt-2 space-y-2">
            <div className="h-3 w-24 rounded bg-foreground/10" />
            <div className="h-2 w-full rounded bg-muted-foreground/8" />
          </div>
        </div>
      </div>
    );
  }

  if (style === "Executive") {
    return (
      <div className="p-1 space-y-3">
        <div className="border-b-2 border-foreground/15 pb-3 space-y-1.5">
          <div className="h-5 w-40 rounded bg-foreground/15" />
          <div className="h-2.5 w-28 rounded bg-accent/20" />
          <div className="h-2 w-56 rounded bg-muted-foreground/10" />
        </div>
        <div className="bg-muted/60 rounded p-2 space-y-1.5">
          <div className="h-2 w-full rounded bg-muted-foreground/10" />
          <div className="h-2 w-5/6 rounded bg-muted-foreground/10" />
          <div className="h-2 w-4/5 rounded bg-muted-foreground/10" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1,2,3].map(i => (
            <div key={i} className="text-center space-y-1">
              <div className="h-3 w-8 mx-auto rounded bg-accent/20" />
              <div className="h-1.5 w-full rounded bg-muted-foreground/8" />
            </div>
          ))}
        </div>
        <div className="space-y-2 mt-2">
          <div className="h-3 w-28 rounded bg-foreground/12" />
          <div className="h-2 w-full rounded bg-muted-foreground/8" />
          <div className="h-2 w-5/6 rounded bg-muted-foreground/8" />
        </div>
      </div>
    );
  }

  if (style === "ATS-Simple") {
    return (
      <div className="p-1 space-y-3 font-mono">
        <div className="h-4 w-32 rounded bg-foreground/12" />
        <div className="h-1.5 w-52 rounded bg-muted-foreground/10" />
        <div className="h-[1px] bg-border/60 my-1" />
        <div className="space-y-2">
          <div className="h-2.5 w-20 rounded bg-foreground/10" />
          <div className="h-1.5 w-full rounded bg-muted-foreground/6" />
          <div className="h-1.5 w-full rounded bg-muted-foreground/6" />
          <div className="h-1.5 w-5/6 rounded bg-muted-foreground/6" />
        </div>
        <div className="h-[1px] bg-border/60 my-1" />
        <div className="space-y-2">
          <div className="h-2.5 w-24 rounded bg-foreground/10" />
          <div className="h-1.5 w-full rounded bg-muted-foreground/6" />
          <div className="h-1.5 w-4/5 rounded bg-muted-foreground/6" />
        </div>
        <div className="h-[1px] bg-border/60 my-1" />
        <div className="space-y-2">
          <div className="h-2.5 w-16 rounded bg-foreground/10" />
          <div className="h-1.5 w-full rounded bg-muted-foreground/6" />
        </div>
      </div>
    );
  }

  // Modern (default)
  return (
    <div className="p-1 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-2 h-16 rounded-full bg-primary/30" />
        <div className="space-y-1.5">
          <div className="h-4 w-32 rounded bg-foreground/10" />
          <div className="h-2 w-44 rounded bg-muted-foreground/10" />
          <div className="h-1.5 w-36 rounded bg-primary/15" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-20 rounded bg-primary/15" />
        <div className="h-2 w-full rounded bg-muted-foreground/8" />
        <div className="h-2 w-5/6 rounded bg-muted-foreground/8" />
        <div className="h-2 w-4/6 rounded bg-muted-foreground/8" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-24 rounded bg-primary/15" />
        <div className="h-2 w-full rounded bg-muted-foreground/8" />
        <div className="h-2 w-3/4 rounded bg-muted-foreground/8" />
      </div>
      <div className="flex flex-wrap gap-1.5 mt-2">
        {["w-12", "w-14", "w-10", "w-16", "w-11"].map((w, i) => (
          <div key={i} className={`h-4 ${w} rounded-full bg-primary/10`} />
        ))}
      </div>
    </div>
  );
};

export default TemplatePreview;
