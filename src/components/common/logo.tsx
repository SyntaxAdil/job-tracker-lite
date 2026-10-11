import { ShoppingBag } from "lucide-react";

type LogoProps = {
  text?: boolean;
  rootClass?: string;
  size?: number;
  horizontalText?: boolean;
};
const Logo = ({
  text = true,
  rootClass = "",
  size = 18,
  horizontalText = true,
}: LogoProps) => {
  return (
    <div
      className={`${rootClass} flex items-center gap-2 w-fit ${horizontalText ? "flex-row" : "flex-col"}`}
    >
      <div className="bg-primary w-fit p-2 rounded-md">
        <ShoppingBag size={size} color="white"></ShoppingBag>
      </div>
      {text && (
        <span className="text-foreground font-semibold">Job Tracker Lite</span>
      )}
    </div>
  );
};

export default Logo;
