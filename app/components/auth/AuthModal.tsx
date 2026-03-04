"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";
import { Badge } from "@/app/components/ui/Badge";
import { colors } from "@/constants/colors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginUser, registerUser, clearError } from "@/redux/slices/authSlice";
import { useToast } from "@/app/components/ui/Toast";
import { AuthModalProps } from "@/types/auth";

const AuthModal = ({ open, mode, onClose, onSwitchMode }: AuthModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);
  const toast = useToast();

  const [prevOpen, setPrevOpen] = useState(open);
  const [prevMode, setPrevMode] = useState(mode);

  if (open !== prevOpen || mode !== prevMode) {
    setPrevOpen(open);
    setPrevMode(mode);
    if (open) {
      setEmail("");
      setPassword("");
      setFullName("");
      dispatch(clearError());
    }
  }

  const isLogin = mode === "login";

  useEffect(() => {
    if (status === "authenticated" && open) {
      toast({
        type: "success",
        title: isLogin ? "Logged in" : "Account created",
        message: "You are now signed in.",
      });
      onClose();
    }
  }, [status, open, onClose, toast, isLogin]);

  useEffect(() => {
    if (error && status === "error") {
      toast({
        type: "error",
        title: "Authentication failed",
        message: error,
      });
    }
  }, [error, status, toast]);

  const handleSubmit = () => {
    if (isLogin) {
      dispatch(loginUser({ email, password }));
      return;
    }
    dispatch(registerUser({ email, password, name: fullName || undefined }));
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center px-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border shadow-2xl"
            style={{
              background: colors.background.card,
              borderColor: colors.border.glass,
            }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute -top-24 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full blur-3xl"
                style={{ background: colors.background.glow }}
              />
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl" />
            </div>

            <div className="relative p-8">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <Badge variant="info">Secure Access</Badge>
                  <h2 className="text-3xl font-semibold text-white">
                    {isLogin ? "Welcome back" : "Create your account"}
                  </h2>
                  <p
                    className="text-sm"
                    style={{ color: colors.text.secondary }}
                  >
                    {isLogin
                      ? "Log in to analyze resumes and track hiring decisions."
                      : "Register to generate explainable candidate evaluations."}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full border border-white/10 p-2 text-slate-400 transition hover:text-white cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form className="mt-8 space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />

                {!isLogin ? (
                  <Input
                    label="Full Name"
                    placeholder="Your full name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                  />
                ) : null}

                <Button
                  type="button"
                  size="lg"
                  className="w-full justify-center"
                  isLoading={status === "loading"}
                  onClick={handleSubmit}
                >
                  {isLogin ? "Log in" : "Create account"}
                </Button>
              </form>

              {error ? (
                <p className="mt-4 text-sm text-red-400">{error}</p>
              ) : null}

              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="text-slate-400">
                  {isLogin ? "New here?" : "Already have an account?"}
                </span>
                <button
                  onClick={() => onSwitchMode(isLogin ? "register" : "login")}
                  className="text-cyan-300 transition hover:text-cyan-200 cursor-pointer"
                  type="button"
                >
                  {isLogin ? "Create account" : "Log in"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export { AuthModal };
