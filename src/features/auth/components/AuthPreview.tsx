import { FiSend, FiLayers, FiTrendingUp, FiCheck } from "react-icons/fi";
import type { IconType } from "react-icons";

type Step = {
  icon: IconType;
  title: string;
  description: string;
  chip: string;
  iconClass: string;
  chipClass: string;
};

const steps: Step[] = [
  {
    icon: FiSend,
    title: "Apply",
    description: "Add a job you applied to, or save one to your wishlist.",
    chip: "Applied",
    iconClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    chipClass: "bg-primary/15 text-primary border-primary/20",
  },
  {
    icon: FiLayers,
    title: "Organize in a workspace",
    description: "Group applications by search, like “2026 Frontend Search”.",
    chip: "Workspace",
    iconClass: "bg-primary/10 text-primary",
    chipClass: "bg-secondary text-secondary-foreground border-border",
  },
  {
    icon: FiTrendingUp,
    title: "Track every stage",
    description: "Move cards from interview to offer and see your progress.",
    chip: "Interview → Offer",
    iconClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    chipClass:
      "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
];

export function AuthPreview() {
  return (
    <div className="hidden lg:flex flex-col justify-center space-y-6 max-w-lg p-6">
      {/* Title & Tagline */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary uppercase tracking-wider">
          <span className="size-1.5 rounded-full bg-primary" />
          Purpose-built for job seekers
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground leading-tight">
          Track your entire pipeline in one simple workspace.
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Say goodbye to messy spreadsheets. Organize stages, monitor callbacks,
          log interview debriefs, and hit your offer targets with focused
          discipline.
        </p>
      </div>



      {/* How it works (static flow) */}
      <div className="bg-card border border-border p-5 rounded-2xl shadow-xs">
        <span className="text-xs font-bold text-foreground uppercase tracking-wider block mb-4">
          How it works
        </span>

        <ol>
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === steps.length - 1;

            return (
              <li key={step.title} className="flex gap-4">
                {/* Icon + connector line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`size-9 shrink-0 rounded-lg flex items-center justify-center ${step.iconClass}`}
                  >
                    <Icon className="size-4" />
                  </div>
                  {!isLast && <div className="w-px flex-1 bg-border my-1" />}
                </div>

                {/* Content */}
                <div className={`flex-1 ${isLast ? "" : "pb-5"}`}>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold text-foreground">
                      <span className="text-muted-foreground font-medium mr-1.5">
                        {i + 1}.
                      </span>
                      {step.title}
                    </h4>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-md border whitespace-nowrap ${step.chipClass}`}
                    >
                      {step.chip}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Result line */}
        <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
          <FiCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
          One place for every application, no spreadsheets needed.
        </div>
      </div>
    </div>
  );
}