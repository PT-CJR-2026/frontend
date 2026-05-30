import { Camera, Plus, X, ImageIcon } from "lucide-react";
import { useState, useRef, DragEvent, ChangeEvent } from "react";

interface ImagemInputProps {
    large?: boolean;
    value?: File | null;
    onChange?: (file: File | null) => void;
}

export default function ImagemInput({ large = false, value, onChange }: ImagemInputProps) {
    const [internalImage, setInternalImage] = useState<{ file: File; url: string } | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const image = value !== undefined
        ? value ? { file: value, url: URL.createObjectURL(value) } : null
        : internalImage;

    const setImage = (file: File | null) => {
        if (onChange) {
            onChange(file);
        } else {
            if (internalImage?.url) URL.revokeObjectURL(internalImage.url);
            setInternalImage(file ? { file, url: URL.createObjectURL(file) } : null);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file?.type.startsWith("image/")) setImage(file);
        e.target.value = "";
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file?.type.startsWith("image/")) setImage(file);
    };

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
            />

            <div
                role="button"
                tabIndex={0}
                onClick={() => !image && inputRef.current?.click()}
                onKeyDown={(e) => e.key === "Enter" && !image && inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`
                    relative rounded-2xl border-2 border-dashed
                    flex flex-col items-center justify-center gap-2
                    transition-colors duration-150 select-none overflow-hidden
                    ${large ? "w-full h-[120px]" : "aspect-square w-full"}
                    ${image
                        ? "border-transparent cursor-default"
                        : `border-[#6A38F3]/50 cursor-pointer ${isDragging ? "bg-violet-50 border-[#6A38F3]" : "bg-[#EDEDED] hover:bg-violet-50/60"}`
                    }
                `}
            >
                {image ? (
                    <>
                        <img src={image.url} alt="imagem" className="w-full h-full object-cover" />
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setImage(null); }}
                            className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                        >
                            <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                        </button>
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                            className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full bg-[#6A38F3]/80 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                        >
                            <Camera className="w-3 h-3" />
                        </button>
                    </>
                ) : (
                    <>
                        <div className="relative">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isDragging ? "bg-violet-200" : "bg-violet-100"}`}>
                                {isDragging
                                    ? <ImageIcon className="w-5 h-5 text-[#6A38F3]" />
                                    : <Camera className="w-5 h-5 text-[#6A38F3]" />
                                }
                            </div>
                            {!isDragging && (
                                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#6A38F3] rounded-full flex items-center justify-center">
                                    <Plus className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                                </span>
                            )}
                        </div>
                        {large && (
                            <span className="text-sm text-gray-400 pointer-events-none">
                                {isDragging ? "Solte aqui" : "Arraste ou clique para anexar fotos"}
                            </span>
                        )}
                    </>
                )}
            </div>
        </>
    );
}