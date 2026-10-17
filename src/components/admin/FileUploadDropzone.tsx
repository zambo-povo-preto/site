"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, FileText, CheckCircle2, X, RefreshCw } from "lucide-react";

export interface FileUploadDropzoneProps {
  id?: string;
  label?: string;
  sublabel?: string;
  required?: boolean;
  accept?: string;
  formatsHint?: string;
  maxSizeMB?: number;
  file: File | null;
  onFileChange: (file: File | null) => void;
  currentFileName?: string;
  currentFileSize?: string;
  compact?: boolean;
  disabled?: boolean;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function FileUploadDropzone({
  id,
  label,
  sublabel,
  required = false,
  accept,
  formatsHint,
  maxSizeMB = 20,
  file,
  onFileChange,
  currentFileName,
  currentFileSize,
  compact = false,
  disabled = false,
  className = "",
}: FileUploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const validateAndSetFile = (selectedFile: File) => {
    setErrorMsg(null);
    if (maxSizeMB && selectedFile.size > maxSizeMB * 1024 * 1024) {
      setErrorMsg(`O arquivo excede o limite máximo permitido de ${maxSizeMB}MB.`);
      return;
    }
    onFileChange(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files[0];
      validateAndSetFile(selected);
    }
  };

  const triggerSelect = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setErrorMsg(null);
    onFileChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // Determina o texto de formatos se não for fornecido explicitamente
  const resolvedFormats =
    formatsHint ||
    (accept
      ? accept
          .split(",")
          .map((ext) => ext.trim().replace(".", "").toUpperCase())
          .join(", ")
      : "PDF, XLSX, DOC, DOCX ou Imagens");

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-[#222222] tracking-wide"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {sublabel && (
        <p className="text-[11px] text-[#756F67] leading-tight mb-0.5">
          {sublabel}
        </p>
      )}

      {/* Input nativo oculto */}
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        required={required && !file && !currentFileName}
        disabled={disabled}
        className="hidden"
        onChange={handleInputChange}
      />

      {/* Dropzone Box */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={triggerSelect}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            triggerSelect();
          }
        }}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`group relative w-full flex flex-col items-center justify-center transition-all duration-200 outline-none select-none ${
          compact ? "p-3.5 sm:p-4 rounded-md min-h-[100px]" : "p-5 sm:p-6 rounded-lg min-h-[135px]"
        } ${
          disabled
            ? "opacity-60 cursor-not-allowed bg-[#F5F2EB] border-2 border-dashed border-[#D4C9B6]"
            : isDragging
            ? "cursor-copy bg-[#1A7D3C]/10 border-2 border-dashed border-[#1A7D3C] scale-[1.008] shadow-sm"
            : file
            ? "cursor-pointer bg-[#FAF7F2] border-2 border-dashed border-[#1A7D3C]/70 hover:border-[#1A7D3C] hover:bg-[#1A7D3C]/5"
            : "cursor-pointer bg-[#FAF7F2] hover:bg-[#F5F0E6] border-2 border-dashed border-[#D4C9B6] hover:border-[#B3A692] hover:shadow-xs"
        }`}
      >
        {file ? (
          /* Estado com arquivo novo selecionado */
          <div className="w-full flex items-center justify-between gap-3 p-2 rounded-md bg-white border border-[#E3DCCF] shadow-xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex-shrink-0 w-10 h-10 rounded-md bg-[#1A7D3C]/10 text-[#1A7D3C] flex items-center justify-center border border-[#1A7D3C]/20">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs sm:text-sm text-[#121212] truncate max-w-[220px] sm:max-w-[320px] md:max-w-[420px]">
                    {file.name}
                  </span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#1A7D3C]/15 text-[#1A7D3C] uppercase tracking-wide">
                    <CheckCircle2 className="w-3 h-3" />
                    Pronto
                  </span>
                </div>
                <span className="text-[11px] text-[#756F67]">
                  {formatBytes(file.size)} • Clique no card ou no botão para trocar
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                type="button"
                onClick={triggerSelect}
                title="Trocar arquivo"
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-[#FAF7F2] hover:bg-[#EAE4D7] text-[#222222] border border-[#D4C9B6] transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span className="hidden sm:inline">Trocar</span>
              </button>
              <button
                type="button"
                onClick={handleRemove}
                title="Remover arquivo selecionado"
                className="p-1 rounded text-[#756F67] hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : currentFileName ? (
          /* Estado em edição: arquivo existente anexado */
          <div className="w-full flex items-center justify-between gap-3 p-2 rounded-md bg-white border border-[#E3DCCF] shadow-xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex-shrink-0 w-10 h-10 rounded-md bg-[#FAF7F2] text-[#6B5E55] flex items-center justify-center border border-[#E3DCCF]">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0 text-left">
                <span className="font-semibold text-xs sm:text-sm text-[#121212] truncate max-w-[220px] sm:max-w-[320px] md:max-w-[420px]">
                  {currentFileName}
                </span>
                <span className="text-[11px] text-[#756F67]">
                  {currentFileSize ? `${currentFileSize} • ` : ""}Arquivo atual cadastrado
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                type="button"
                onClick={triggerSelect}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-[#FAF7F2] hover:bg-[#EAE4D7] text-[#222222] border border-[#D4C9B6] transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Substituir</span>
              </button>
            </div>
          </div>
        ) : (
          /* Estado inicial / vazio com instruções completas */
          <div className="flex flex-col items-center justify-center text-center gap-2">
            <div
              className={`rounded-full flex items-center justify-center transition-transform group-hover:scale-105 duration-200 ${
                compact
                  ? "w-8 h-8 bg-white border border-[#D4C9B6] text-[#6B5E55]"
                  : "w-11 h-11 bg-white border border-[#D4C9B6] text-[#6B5E55] shadow-xs"
              }`}
            >
              <UploadCloud className={compact ? "w-4 h-4" : "w-6 h-6"} />
            </div>

            <div className="flex flex-col items-center">
              <span className="font-bold text-xs sm:text-sm text-[#222222]">
                <span className="text-[#1A7D3C] hover:underline">Clique aqui para enviar</span> ou arraste o arquivo
              </span>
              <span className="text-[11px] text-[#756F67] mt-0.5">
                Solte seu arquivo nesta área demarcada
              </span>
            </div>

            {/* Badges de formato e limite */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-[#EFECE6] text-[#554E46] border border-[#DDD6C9]">
                Formatos: {resolvedFormats}
              </span>
              {maxSizeMB && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-[#EFECE6] text-[#554E46] border border-[#DDD6C9]">
                  Até {maxSizeMB}MB
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {errorMsg && (
        <span className="text-xs text-red-600 font-medium pl-1">
          {errorMsg}
        </span>
      )}
    </div>
  );
}
