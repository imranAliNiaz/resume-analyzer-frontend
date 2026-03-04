"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { fetchMe, hydrate } from "@/redux/slices/authSlice";
import { ToastProvider } from "@/app/components/ui/Toast";

const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    store.dispatch(hydrate());
    store.dispatch(fetchMe());
  }, []);

  return (
    <Provider store={store}>
      <ToastProvider>{children}</ToastProvider>
    </Provider>
  );
};

export { Providers };
