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
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import originsTech from "../../assets/json/tech/origins";
import originsGame from "../../assets/json/game/origins";
import { SettingsContext } from "../../hooks/settings";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function NavigationBar() {
  const { originGameChange, originTechChange } =
    React.useContext(SettingsContext);

  return (
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
                  //onClick={() => originTechChange(component.url)}
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
                  //onClick={() => originGameChange(component.url)}
                >
                  {component.title}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="hidden">
          <NavigationMenuTrigger>MAGNET</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              <ListItem title={"Magnet"} href={`/`}>
                Magnet
              </ListItem>
              <ListItem title={"Movie"} href={`/magnet/movie`}>
                Magnet
              </ListItem>
              <ListItem title={"Trend"} href={`/magnet/trend`}>
                Magnet
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/*<NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>*/}
      </NavigationMenuList>
    </NavigationMenu>
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
