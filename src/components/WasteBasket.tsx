
import React from "react";
import { WasteType } from "./WasteItem";
import { cn } from "@/lib/utils";

export type BasketColor = "blue" | "yellow" | "green" | "red" | "brown";

interface WasteBasketProps {
  id: string;
  title: string;
  acceptType: WasteType;
  color: BasketColor;
  onDrop: (itemType: WasteType, itemId: string) => void;
  children?: React.ReactNode;
}

const WasteBasket = ({ 
  id, 
  title, 
  acceptType, 
  color, 
  onDrop,
  children 
}: WasteBasketProps) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Allow drop
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const data = e.dataTransfer.getData("text/plain");
      const { type, id: itemId } = JSON.parse(data);
      onDrop(type, itemId);
    } catch (error) {
      console.error("Error processing drop event:", error);
    }
  };
  
  // Color mapping for Tailwind
  const colorClasses = {
    blue: "border-blue-500 text-blue-600",
    yellow: "border-yellow-500 text-yellow-700",
    green: "border-green-500 text-green-600",
    red: "border-red-500 text-red-600",
    brown: "border-amber-700 text-amber-800",
  };

  return (
    <div
      id={id}
      className={cn(
        "basket", 
        colorClasses[color].split(" ")[0],
        "transform transition-all duration-200 hover:shadow-xl"
      )}
      data-accept={acceptType}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h3 className={cn("basket-title", colorClasses[color].split(" ")[1])}>{title}</h3>
      <div className="basket-contents">
        {children}
      </div>
    </div>
  );
};

export default WasteBasket;
