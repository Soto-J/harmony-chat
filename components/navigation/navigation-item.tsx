"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import ActionTooltip from "@/components/action-tooltip";

type NavigationItemProps = {
  id: string;
  name: string;
  imageUrl: string;
};

const NavigationItem = ({ id, name, imageUrl }: NavigationItemProps) => {
  const router = useRouter();
  const params = useParams();

  return <div>NavigationItem</div>;
};

export default NavigationItem;
