
import React from "react";
import { WasteItemData } from "@/hooks/useWasteSortingGame";
import { WasteType } from "./WasteItem";
import WasteBasket from "./WasteBasket";
import WasteItem from "./WasteItem";

interface GamePlayAreaProps {
  wasteItems: WasteItemData[];
  onDrop: (itemType: WasteType, itemId: string, basketType: WasteType, basketId: string) => void;
}

const GamePlayArea = ({ wasteItems, onDrop }: GamePlayAreaProps) => {
  const baskets = [
    { id: "dryBasket", title: "Dry Waste", acceptType: "dry" as WasteType, color: "yellow" as const },
    { id: "recyclableBasket", title: "Recyclable Waste", acceptType: "recyclable" as WasteType, color: "green" as const },
    { id: "hazardousBasket", title: "Hazardous Waste", acceptType: "hazardous" as WasteType, color: "red" as const },
    { id: "organicBasket", title: "Organic Waste", acceptType: "organic" as WasteType, color: "brown" as const }
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {baskets.map((basket) => (
          <WasteBasket 
            key={basket.id}
            id={basket.id}
            title={basket.title}
            acceptType={basket.acceptType}
            color={basket.color}
            onDrop={(itemType, itemId) => {
              onDrop(itemType, itemId, basket.acceptType, basket.id);
            }}
          >
            {wasteItems
              .filter(item => item.basket === basket.id)
              .map(item => (
                <WasteItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  type={item.type}
                  image={item.image}
                  isCorrect={item.isCorrect}
                  isIncorrect={item.isIncorrect}
                  isDraggable={item.isDraggable}
                  isSmall={item.isSmall}
                />
              ))}
          </WasteBasket>
        ))}
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Drag Items to Sort</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {wasteItems
            .filter(item => item.basket === null)
            .map(item => (
              <WasteItem
                key={item.id}
                id={item.id}
                name={item.name}
                type={item.type}
                image={item.image}
                isDraggable={item.isDraggable}
                isSmall={item.isSmall}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default GamePlayArea;
