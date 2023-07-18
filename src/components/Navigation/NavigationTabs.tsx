import Link from "next/link"
import { useRouter } from "next/router";
import { useMemo } from "react";

interface LinkData {
  label: string,
  address: string
}

interface NavigationTabsProps {
  linksData: LinkData[]
}

export default function NavigationTabs({linksData}: NavigationTabsProps){
  const location = useRouter();
  
  const _linksData = useMemo(() => {
    return linksData.map(({label, address}) => ({
      label,
      address,
      selected: String(location.route.includes(address))
    }))
  }, [location.route, linksData])

  return (
    <>
    <ul
      className="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0"
      role="tablist"
      data-te-nav-ref>
        {_linksData.map(({label, address, selected}, key) => (
        <li role="presentation" key={address}>
          <Link
            href={address}
            passHref
            data-te-toggle="pill"
            data-te-target={address}
            //data-te-nav-active
            //role="tab"
            aria-controls={address}
            aria-selected={selected}
            >
              <span className={`
                my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium 
                uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 
                focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary 
                dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 
                dark:data-[te-nav-active]:text-primary-400 cursor-pointer
                ${selected === 'true' && 'border-primary text-primary dark:border-primary-400 dark:text-primary-400'}
                `}>
                {label}
              </span>
          </Link>
        </li>
        ))}
    </ul>
    </>
  );
}