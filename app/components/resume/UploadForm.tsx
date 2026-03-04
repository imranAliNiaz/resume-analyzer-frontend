"use client";

import { Upload, FileText, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { colors } from "@/constants/colors";
import { useFileUpload } from "@/hooks/useFileUpload";
import type { UploadFormProps } from "@/types/resume";

const UploadForm = ({ onFileChange }: UploadFormProps) => {
  const {
    file,
    isDragging,
    error,
    fileInputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    clearFile,
  } = useFileUpload(onFileChange);

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative cursor-pointer group
              border-2 border-dashed rounded-2xl p-12 text-center transition-all
              ${isDragging ? "border-cyan-400 bg-cyan-500/5" : "border-white/10 hover:border-white/20 hover:bg-white/5"}
            `}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.docx,.txt"
              className="hidden"
            />
            <div className="bg-slate-800/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
              <Upload
                className="text-cyan-300 group-hover:text-cyan-200"
                size={32}
              />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Upload your resume
            </h3>
            <p className="text-slate-400 text-sm mb-2">
              Drag and drop your PDF, DOCX, or TXT file here
            </p>
            {error ? (
              <p className="text-xs text-red-400 mb-4">{error}</p>
            ) : (
              <p className="text-xs mb-4" style={{ color: colors.text.muted }}>
                Max 10MB. We parse skills, experience, and education.
              </p>
            )}
            <Button variant="outline" size="sm">
              Browse Files
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="file-preview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="bg-cyan-500/15 p-3 rounded-xl">
                <FileText className="text-cyan-300" size={24} />
              </div>
              <div>
                <p className="text-white font-medium truncate max-w-[200px]">
                  {file.name}
                </p>
                <p className="text-slate-400 text-xs">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={clearFile}
              className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { UploadForm };
