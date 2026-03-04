"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchMe } from "@/redux/slices/authSlice";
import { Loader } from "@/app/components/ui/Loader";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { accessToken, status, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken && !user) {
      dispatch(fetchMe());
    }
  }, [accessToken, user, dispatch]);

  useEffect(() => {
    if (!accessToken && status !== "loading") {
      router.replace("/");
    }
  }, [accessToken, status, router]);

  if (!accessToken) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
};

export { AuthGuard };
