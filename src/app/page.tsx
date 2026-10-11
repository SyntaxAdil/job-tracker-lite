import React from "react";
import Logo from "../components/common/logo";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { redirect } from "next/navigation";

const Home = () => {
  let auth = false;
  if (auth) {
    redirect("/dashboard");
  } else {
    redirect("/signin");
  }
};

export default Home;
