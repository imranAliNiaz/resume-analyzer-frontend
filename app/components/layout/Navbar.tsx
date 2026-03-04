"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { FileSearch, Menu, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AuthModal } from "@/app/components/auth/AuthModal";
import { images } from "@/constants/images";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  logoutUserThunk,
  openAuthModal,
  closeAuthModal,
} from "@/redux/slices/authSlice";
import { useToast } from "@/app/components/ui/Toast";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthModalOpen, authModalMode } = useAppSelector(
    (state) => state.auth,
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toast = useToast();
  const isAuthenticated = !!user;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Analyze", href: "/upload" },
    ...(isAuthenticated ? [{ name: "History", href: "/history" }] : []),
    { name: "Workflow", href: "/#workflow" },
    { name: "Report", href: "/#report" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4"
      >
        <div className="max-w-[1920px] mx-auto flex items-center justify-between bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl px-4 md:px-6 py-3 shadow-xl">
          <Link
            href="/"
            className="flex items-center gap-2 md:gap-3 group shrink-0"
          >
            <div className="bg-white/10 p-2 rounded-lg border border-white/10">
              <Image
                src={images.logo}
                alt="Resume Analyzer logo"
                width={20}
                height={20}
                className="opacity-80"
              />
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tight text-white">
              Resume<span className="text-cyan-300">Analyzer</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2 md:gap-3">
                <div className="hidden sm:flex items-center gap-2 group cursor-default">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-300 font-semibold text-xs transition-colors group-hover:border-cyan-500/40">
                    {(user?.name || user?.email || "U")
                      .slice(0, 1)
                      .toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-slate-200 hidden md:inline">
                    {user?.name || user?.email?.split("@")[0]}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white"
                  onClick={async () => {
                    await dispatch(logoutUserThunk());
                    setIsMenuOpen(false);
                    toast({
                      type: "info",
                      title: "Logged out",
                      message: "Your session has ended.",
                    });
                  }}
                >
                  Log out
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:inline-flex text-slate-300"
                  onClick={() => {
                    dispatch(openAuthModal("login"));
                  }}
                >
                  Log in
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    dispatch(openAuthModal("register"));
                  }}
                  className="gap-2 text-[13px] md:text-sm"
                >
                  <span className="hidden sm:inline">Get Started</span>
                  <span className="sm:hidden">Start</span>
                  <FileSearch size={16} className="hidden xs:inline" />
                </Button>
              </>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden mt-4 overflow-hidden"
            >
              <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-lg font-medium text-slate-300 hover:text-cyan-400 transition-colors py-2 border-b border-white/5 last:border-0"
                    >
                      {link.name}
                    </Link>
                  ))}

                  {!isAuthenticated && (
                    <div className="flex flex-col gap-3 pt-4 sm:hidden">
                      <Button
                        variant="ghost"
                        className="w-full text-slate-300 justify-start h-12 text-lg"
                        onClick={() => {
                          setIsMenuOpen(false);
                          dispatch(openAuthModal("login"));
                        }}
                      >
                        Log in
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AuthModal
        open={isAuthModalOpen}
        mode={authModalMode}
        onClose={() => dispatch(closeAuthModal())}
        onSwitchMode={(mode) => dispatch(openAuthModal(mode))}
      />
    </>
  );
};

export { Navbar };
