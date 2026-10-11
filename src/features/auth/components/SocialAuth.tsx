import { Button } from "@/components/ui/button";
import { BsGithub, BsGoogle } from "react-icons/bs";

export function SocialAuth() {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      <Button variant="outline" type="button" className="w-full">
        <BsGithub/> <span>GitHub</span>
      </Button>
      <Button variant="outline" type="button" className="w-full">
        <BsGoogle/> <span>Google</span>
      </Button>
    </div>
  );
}