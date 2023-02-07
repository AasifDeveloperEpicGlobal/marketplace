import "../styles/globals.scss";
import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import {
  QueryClient,
  QueryClientProvider,
  DehydratedState,
  Hydrate,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import axios from "../networkAPI/axios";
import { store } from "../redux/store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { saveState } from "utils/handleState";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import Script from "next/script";
import * as gtag from "../lib/gtag";
interface MyAppProps extends AppProps {
  pageProps: { dehydratedState: DehydratedState };
}

function RootApp({ Component, pageProps }: MyAppProps) {
  // const { error, user, isAuthenticated } = useAppSelector(
  //   (state) => state.user
  // );

  const router = useRouter();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnReconnect: true,
            retry: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            //       staleTime: 5*(60*1000), // 5 mins
            // cacheTime: 10*(60*1000), // 10 mins
          },
        },
      })
  );

  useEffect(() => {
    axios.interceptors.request.use((config: any) => {
      const token = localStorage.getItem("token");
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }, []);

  store.subscribe(() => {
    saveState({
      /* example state */
      user: store.getState().user,
    });
  });

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
}

export default RootApp;
