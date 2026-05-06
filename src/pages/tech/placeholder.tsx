import React, { useEffect, useState } from "react";
import Head from "next/head";

import { api } from "../../services/api";
import jsonbin from "../../services/jsonbin";
import { NewsContentProps, NewsProps } from "./[slug]";

import originsJson from "../../assets/json/tech/origins";
const origins = originsJson.origins;

interface OriginCurrent {
  title: string;
  url: string;
  BIN_ID: string;
  index: number;
}

export default function TechNewsPlaceholder() {
  const [responseDebug, setResponseDebug] = useState([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [lastDates, setLastDates] = useState<String[]>([]);
  const [display, setDisplay] = useState("feedback");

  useEffect(() => {
    const refresh = async ({ title, url, BIN_ID, index }: OriginCurrent) => {
      setFeedbackText(`${index + 1} de ${origins.length + 1}`);

      let data = {} as NewsContentProps;
      const params = {
        page: 1,
        url,
      };

      try {
        console.log("/technews/post/origin", { params });
        const response = await api.get("/technews/post/origin", { params });
        data = response.data;

        const last = `${title} | ${data.data[0].created_at}`;
        setLastDates((prevState) => [...prevState, last]);
        // Alert.alert(url, JSON.stringify(params, null, 2));return;
      } catch (error) {
        console.log("LISTA", "/technews/post/origin", params);
        //setResponseDebug([params, error]);
      }

      try {
        await jsonbin.put(BIN_ID, data);
      } catch (error) {
        console.log("PLACEHOLDER", url);
        //setResponseDebug([error]);
      }
    };

    const iterateOrigins = async () => {
      const originRecent = {
        title: "Mais Recentes",
        url: "",
        BIN_ID: "6092cee092cb9267d0ce0e00",
      };
      const originsIncremented = [originRecent, ...origins];

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < originsIncremented.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        await refresh({ ...originsIncremented[i], index: i });
      }
    };

    iterateOrigins();
  }, []);

  // when starting page
  useEffect(() => {
    setResponseDebug([]);
    setFeedbackText("");
  }, []);

  return (
    <>
      <Head>
        <title>News | Placeholder</title>
      </Head>
      <div className="flex flex-col mb-8 gap-4 border-2 min-w-[480px]">
        <div className="break-words">
          {display === "feedback" ? (
            <pre className="text-sm">
              {JSON.stringify(responseDebug, null, 2)}
            </pre>
          ) : (
            <pre className="text-sm">{JSON.stringify(lastDates, null, 2)}</pre>
          )}
        </div>

        <div className="flex flex-row gap-2">
          {display === "feedback" ? (
            <button
              onClick={() => setDisplay("last")}
              className="hover:bg-yellow-500 bg-yellow-400 text-black px-8 py-1 rounded-md cursor-pointer"
            >
              <>Exibir última data</>
            </button>
          ) : (
            <button
              onClick={() => setDisplay("feedback")}
              className="hover:bg-yellow-500 bg-yellow-400 text-black px-8 py-1 rounded-md cursor-pointer"
            >
              <>Exibir feedback</>
            </button>
          )}

          <button
            onClick={() => {}}
            className="hover:bg-yellow-500 bg-yellow-400 text-black px-8 py-1 rounded-md cursor-pointer"
          >
            <>Etapa - {feedbackText}</>
          </button>
        </div>
      </div>
    </>
  );
}
