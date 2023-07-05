import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import "tw-elements/dist/css/tw-elements.min.css";
//import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import AppProvider from '../hooks';
import NavigationTabs from 'components/Navigation/NavigationTabs';

//if (typeof window !== "undefined") document.documentElement.classList.remove('dark');
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen">
        
        <div className="flex flex-col w-full items-center px-8 min-h-screen">
          <main className="w-full max-w-[1124px] mx-auto  border border-1">
            <NavigationTabs 
              linksData={[
                {label: 'Magnet', address: '/magnet'},
                {label: 'Tech', address: '/tech'},
                {label: 'Game', address: '/game'}
              ]}
            />
          </main>

          <main className="w-full max-w-[1124px] mx-auto border border-1 flex-col flex-1 items-center">
            
            <SWRConfig
              value={{
                //refreshInterval: 3000,
                fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
              }}
            >
              <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
              </QueryClientProvider>
            </SWRConfig>
          </main>
        </div>
      </div>
    </AppProvider>
  );
}

export default MyApp
