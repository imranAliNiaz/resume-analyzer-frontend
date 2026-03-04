"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openAuthModal, logoutUserThunk } from "@/redux/slices/authSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, status, error } = useAppSelector((state) => state.auth);
  const isAuthenticated = !!user;

  const login = () => dispatch(openAuthModal("login"));
  const register = () => dispatch(openAuthModal("register"));
  const logout = () => dispatch(logoutUserThunk());

  return {
    user,
    isAuthenticated,
    status,
    error,
    login,
    register,
    logout,
  };
};
