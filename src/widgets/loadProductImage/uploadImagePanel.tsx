import {Button} from "@shared/ui/button.tsx";
import {ImageIcon, Loader2, Trash2, UploadCloudIcon} from "lucide-react";
import React, {useCallback, useRef, useState} from "react";
import type {UploadImagePanelProps} from "@widgets/loadProductImage/types.ts";

export function UploadImagePanel({
  uploading,
  previewUrl,
  errorText,
  onPickFile,
  onClear,
  disabled
}: UploadImagePanelProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const onChoose = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (disabled) return;
      setIsDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) onPickFile(file);
    },
    [disabled, onPickFile]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onPickFile(file);
      e.currentTarget.value = "";
    },
    [onPickFile]
  );

  return (
    <div className="w-full">
      <div
        className={[
          "relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all",
          isDragOver ? "border-primary/60 bg-primary/5" : "border-muted-foreground/30",
          "min-h-[320px] overflow-hidden"
        ].join(" ")}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={onDrop}
        aria-disabled={disabled}
      >
        {uploading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-background/70 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sm">
              <Loader2 className="size-5 animate-spin" />
              Загрузка изображения…
            </div>
          </div>
        )}

        {previewUrl ? (
          <div className="relative w-full h-full">
            <img
              src={previewUrl}
              alt="Превью изображения"
              className="block h-full w-full object-contain p-4"
            />
            <div className="absolute right-3 top-3 flex gap-2">
              <Button size="icon" variant="secondary" onClick={onChoose} disabled={disabled || uploading}>
                <UploadCloudIcon className="size-5" />
              </Button>
              <Button size="icon" variant="destructive" onClick={onClear} disabled={disabled || uploading}>
                <Trash2 className="size-5" />
              </Button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={onChoose}
            disabled={disabled || uploading}
            className="flex flex-col items-center gap-3 p-8 text-center"
          >
            <div className="rounded-full p-4 bg-muted">
              <ImageIcon className="size-8" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Перетащите фото сюда или нажмите, чтобы выбрать</p>
              <p className="text-xs text-muted-foreground">Поддерживаются изображения (PNG, JPG, WEBP)</p>
            </div>
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onChange}
          disabled={disabled || uploading}
        />
      </div>

      {errorText ? (
        <p className="mt-2 text-xs text-destructive">{errorText}</p>
      ) : (
        <p className="mt-2 text-xs text-muted-foreground">
          Рекомендация: загрузите качественное изображение продукта.
        </p>
      )}
    </div>
  );
}