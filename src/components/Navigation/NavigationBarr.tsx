import { useContext } from "react";
import Link from "next/link";

import { ListItem } from "@/components/ui/list-item";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { NavigationMenu } from "radix-ui";
import { SettingsContext } from "hooks/settings";

import _originsTech from "../../assets/json/tech/origins";
import _originsGame from "../../assets/json/game/origins";

const originsTech = _originsTech.origins;
const originsGame = _originsGame.origins;

export function NavigationBar() {
  const { originGameChange, originTechChange } = useContext(SettingsContext);

  return (
    <NavigationMenu.NavigationMenu>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>TECH</NavigationMenu.Trigger>
          <NavigationMenu.Content className="bg-slate-700">
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {originsTech.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  //href={component.url}
                  onClick={() => originTechChange(component.url)}
                >
                  {component.title}
                </ListItem>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger>GAME</NavigationMenu.Trigger>
          <NavigationMenu.Content className="bg-slate-700">
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {originsGame.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  //href={component.url}
                  onClick={() => originGameChange(component.url)}
                >
                  {component.title}
                </ListItem>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <Link href="/docs">
            <NavigationMenu.Link className={navigationMenuTriggerStyle()}>
              DOCUMENTATION
            </NavigationMenu.Link>
          </Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.NavigationMenu>
  );
}
