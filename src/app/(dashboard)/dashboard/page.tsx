"use client";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { signOut, useSession } from "../../../lib/auth/auth-client";
import { Loader2 } from "lucide-react";

const DashboardPage = () => {
  const { data, isPending } = useSession();
  const user = data?.user;
  const loadingSpinnerText = (text: string) =>
    isPending ? <Loader2 className="animate-spin"></Loader2> : text;
  return (
    <div>
      {user ? (
        <Button onClick={async () => await signOut()}>
          {loadingSpinnerText("SignOut")}
        </Button>
      ) : (
        <Link href={"/signin"}>
          <Button>{loadingSpinnerText("SignIn")}</Button>
        </Link>
      )}
    </div>
  );
};

export default DashboardPage;
