import React from "react";
import Logo from "../components/common/logo";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { redirect } from "next/navigation";

const Home = () => {
  
  redirect("/signin");
};

export default Home;
