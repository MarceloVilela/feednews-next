"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import originsTech from "../../assets/json/tech/origins";
import originsGame from "../../assets/json/game/origins";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function NavigationBar() {
  return (
    <div className="flex w-full items-center justify-between">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>TECH</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {originsTech.origins.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={`/tech/${component.title}`}
                  >
                    {component.title}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>GAME</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {originsGame.origins.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={`/game/${component.title}`}
                  >
                    {component.title}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <ThemeToggle />
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, href = "", children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <span
          className={cn(
            "cursor-pointer block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
        >
          <Link href={`${href}`} passHref={true} {...props}>
            <div className="text-sm font-medium leading-none">{title}</div>
            {/*<p className="line-clamp-2 text-sm leading-snug text-muted-foreground hidden">
            {children}
          </p>*/}
          </Link>
        </span>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
