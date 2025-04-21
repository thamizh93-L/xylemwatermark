
import React from "react";
import { cn } from "@/lib/utils";

export type WasteType = "wet" | "dry" | "recyclable" | "hazardous" | "organic";

interface WasteItemProps {
  id: string;
  name: string;
  type: WasteType;
  image: string;
  isCorrect?: boolean;
  isIncorrect?: boolean;
  isDraggable?: boolean;
  isSmall?: boolean;
}

const WasteItem = ({ 
  id, 
  name, 
  type, 
  image, 
  isCorrect = false, 
  isIncorrect = false,
  isDraggable = true,
  isSmall = false
}: WasteItemProps) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ id, type }));
  };

  return (
    <div
      id={id}
      className={cn(
        "waste-item",
        isCorrect && "correct",
        isIncorrect && "incorrect",
        !isDraggable && "cursor-default",
        isSmall && "small-item",
        "transform hover:scale-105 transition-transform"
      )}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      title={name}
      data-type={type}
    >
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-contain rounded" 
      />
    </div>
  );
};

export default WasteItem;
