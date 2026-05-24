import { Camera, Plus } from "lucide-react";

export default function ImagemInput({large = false} : { large?:boolean}) {
    return(
        <button
            type="button"
            className={`
                border-2 border-dashed border-[#6A38F3] rounded-2xl
                flex flex-col items-center justify-center gap-2
                cursor-pointer transition-colors
                ${large ? "w-full py-6" : "aspect-square w-full"}
            `}
        >
            <div className="relative">
                <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
                    <Camera className="w-5 h-5 text-[#6A38F3]" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#6A38F3] rounded-full flex items-center justify-center">
                    <Plus className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                </span>
            </div>
            {large && (
                <span className="text-sm text-gray-400">Anexe as fotos do seu produto</span>
            )}
        </button>
    );
}