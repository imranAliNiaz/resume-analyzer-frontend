import Link from "next/link";
import Image from "next/image";
import { images } from "@/constants/images";
import { colors } from "@/constants/colors";

const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1536px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
        <div className="col-span-2 md:col-span-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
              <Image
                src={images.logo}
                alt="Resume Analyzer logo"
                width={16}
                height={16}
              />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Resume<span className="text-cyan-300">Analyzer</span>
            </span>
          </div>
          <p
            className="text-sm leading-relaxed max-w-xs"
            style={{ color: colors.text.secondary }}
          >
            AI-powered resume analysis and job matching platform for the modern
            workforce.
          </p>
        </div>

        <div className="pl-0 md:pl-8">
          <h4 className="text-white font-semibold mb-6">Product</h4>
          <ul
            className="space-y-4 text-sm"
            style={{ color: colors.text.secondary }}
          >
            <li>
              <Link
                href="/upload"
                className="hover:text-cyan-300 transition-colors"
              >
                Resume Check
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-cyan-300 transition-colors">
                Score Calculator
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-cyan-300 transition-colors">
                AI Feedback
              </Link>
            </li>
          </ul>
        </div>

        <div className="pl-0 md:pl-8">
          <h4 className="text-white font-semibold mb-6">Company</h4>
          <ul
            className="space-y-4 text-sm"
            style={{ color: colors.text.secondary }}
          >
            <li>
              <Link href="/" className="hover:text-cyan-300 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-cyan-300 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-cyan-300 transition-colors">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        <div className="pl-0 md:pl-8">
          <h4 className="text-white font-semibold mb-6">Connect</h4>
          <ul
            className="space-y-4 text-sm"
            style={{ color: colors.text.secondary }}
          >
            <li>
              <Link href="/" className="hover:text-cyan-300 transition-colors">
                Twitter
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-cyan-300 transition-colors">
                LinkedIn
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-cyan-300 transition-colors">
                GitHub
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1536px] mx-auto mt-12 pt-8 border-t border-white/5 text-center">
        <p className="text-xs" style={{ color: colors.text.muted }}>
          © {new Date().getFullYear()} ResumeAnalyzer AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export { Footer };
