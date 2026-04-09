import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

interface optionData {
  label: string,
  id: string,
  onClick: () => void
}

export interface MenuButtonProps {
  options: optionData[]
}

export default function MenuButton({options}: MenuButtonProps){
  const [current, setCurrent] = useState('');

  useEffect(() => {
    if(!current && options.length > 0 && options[0].label != ''){
      setCurrent(options[0].label)
    }
  }, [options, current]);
  
  const _options = useMemo(() => {
    return options.map(({label, id, onClick}) => ({
      label,
      id,
      onClick,
      selected: label == current
    }))
  }, [options, current])

  const handleOnClick = (label: string, callback: Function) => {
    setCurrent(label);
    callback()
  }
  
  //const unselectedClassName = "inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]";
  //const selectedClassName = "inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200";

  if (!options || options.length === 0 || !process.browser) {
    return <></>
  }

  return (
    <div className="flex flex-row gap-2 flex-wrap">
    {_options.map(({label, id, onClick, selected}, key) => (
      <Button
        key={id}
        type="button"
        variant={selected ? 'default' : 'secondary'}
        //className={selected ? selectedClassName : unselectedClassName}
        onClick={() => handleOnClick(label, onClick)}
      >
        {label}
      </Button>
    ))}
    </div>
  );
}