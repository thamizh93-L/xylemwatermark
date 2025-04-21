import { useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import { WasteType } from "@/components/WasteItem";

export interface WasteItemData {
  id: string;
  name: string;
  type: WasteType;
  image: string;
  isCorrect: boolean;
  isIncorrect: boolean;
  basket: string | null;
  isDraggable: boolean;
  isSmall: boolean;
}

export const useWasteSortingGame = () => {
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [messageQueue, setMessageQueue] = useState<string[]>([]);

  const [wasteItems, setWasteItems] = useState<WasteItemData[]>([
    { 
      id: "item1", 
      name: "Plastic Bottle", 
      type: "recyclable", 
      image: "/lovable-uploads/747eadb7-ec60-49d5-aa0e-447f2d4db4d8.png", 
      isCorrect: false, 
      isIncorrect: false, 
      basket: null,
      isDraggable: true,
      isSmall: false
    },
    { 
      id: "item2", 
      name: "Eggshells", 
      type: "organic", 
      image: "/lovable-uploads/60c324b4-4d04-4656-a8b3-194a168f2f2e.png", 
      isCorrect: false, 
      isIncorrect: false, 
      basket: null,
      isDraggable: true,
      isSmall: false
    },
    { 
      id: "item3", 
      name: "Newspaper", 
      type: "recyclable", 
      image: "/lovable-uploads/ca26b91a-6d86-4f38-b798-aa40026adbca.png", 
      isCorrect: false, 
      isIncorrect: false, 
      basket: null,
      isDraggable: true,
      isSmall: false
    },
    { 
      id: "item4", 
      name: "Glass Jar", 
      type: "recyclable", 
      image: "/lovable-uploads/316fcbeb-6622-4b33-9b65-9452a6c16456.png", 
      isCorrect: false, 
      isIncorrect: false, 
      basket: null,
      isDraggable: true,
      isSmall: false
    },
    { 
      id: "item6", 
      name: "Vegetable Peels", 
      type: "organic", 
      image: "/lovable-uploads/34b64614-37ec-4557-8b54-53cff3ce52e0.png", 
      isCorrect: false, 
      isIncorrect: false, 
      basket: null,
      isDraggable: true,
      isSmall: false
    },
    { 
      id: "item7", 
      name: "Batteries", 
      type: "hazardous", 
      image: "/lovable-uploads/1910853e-f630-4304-b3e0-7f2d625b5917.png", 
      isCorrect: false, 
      isIncorrect: false, 
      basket: null,
      isDraggable: true,
      isSmall: false
    },
  ]);

  const getEducationalMessage = (itemName: string, isCorrect: boolean) => {
    const messages: Record<string, { correct: string; incorrect: string }> = {
      "Plastic Bottle": {
        correct: "Correct! Plastic bottles go in dry waste. 🧴 But remember, it's even better to reuse or recycle them to reduce plastic pollution. Keep sorting smart!",
        incorrect: "Not quite! Plastic bottles belong in Dry Waste. They're not biodegradable but can often be recycled. Try placing it in Dry Waste next time!"
      },
      "Eggshells": {
        correct: "Nice job! Eggshells are biodegradable and great for compost. 🌿 Crushed eggshells can even keep pests away from your garden. You're doing egg-cellent!",
        incorrect: "Hmm... almost! Eggshells are organic waste. They decompose easily and can be composted. Let's toss them into the Organic Waste bin!"
      },
      "Newspaper": {
        correct: "Well done! Paper is recyclable. ♻️ Reusing and recycling paper helps save trees and reduce landfill waste. High five!",
        incorrect: "Oops! That's a recyclable item. ♻️ Paper can be recycled to reduce waste and save trees. Try dropping it into the Dry Waste bin!"
      },
      "Glass Jar": {
        correct: "Awesome! Glass is 100% recyclable and can be reused over and over. 🍾 Sorting it properly keeps it out of the landfill. You're a true eco-warrior!",
        incorrect: "Oopsie! That glass jar is recyclable. Glass can be melted and reused again and again. Let's put it in the Recyclable Waste bin!"
      },
      "Vegetable Peels": {
        correct: "Great job! Vegetable peels are perfect for composting! 🌱 They break down easily and help enrich the soil. Did you know? You can use them to create nutrient-rich compost at home! Keep going, green hero!",
        incorrect: "Oops! Vegetable peels are organic waste because they break down naturally. Let's try putting it in the Organic Waste bin!"
      },
      "Batteries": {
        correct: "Good catch! Batteries are hazardous and should never go in regular bins. ⚠️ They contain harmful chemicals and need special disposal. You're protecting the planet!",
        incorrect: "Careful! Batteries are hazardous and contain toxic materials. ⚠️ They need special handling — toss them into the Hazardous Waste bin!"
      }
    };

    return messages[itemName]?.[isCorrect ? "correct" : "incorrect"] || 
           (isCorrect ? "Great job! That's correct! 🌟" : "Oops! Try again! 💪");
  };

  const showEducationalModal = (message: string) => {
    if (modalOpen) {
      setMessageQueue((queue) => [...queue, message]);
    } else {
      setModalMessage(message);
      setModalOpen(true);
    }
  };

  const handleModalOk = () => {
    if (messageQueue.length > 0) {
      setModalMessage(messageQueue[0]);
      setMessageQueue((queue) => queue.slice(1));
    } else {
      setModalOpen(false);
      setModalMessage(null);
    }
  };

  const handleDrop = (itemType: WasteType, itemId: string, basketType: WasteType, basketId: string) => {
    setWasteItems(prev => {
      const updatedItems = prev.map(item => {
        if (item.id === itemId) {
          const isCorrect = itemType === basketType;
          setTimeout(() => {
            if (isCorrect) {
              setScore(s => s + 10);
              showEducationalModal(getEducationalMessage(item.name, true));
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 2000);
            } else {
              setScore(s => Math.max(0, s - 5));
              showEducationalModal(getEducationalMessage(item.name, false));
            }
          }, 100);

          return {
            ...item,
            isCorrect,
            isIncorrect: !isCorrect,
            basket: basketId,
            isDraggable: false,
            isSmall: true
          };
        }
        return item;
      });
      return updatedItems;
    });
  };

  const resetGame = () => {
    setScore(0);
    setShowConfetti(false);
    setGameComplete(false);
    setWasteItems(prev => {
      return prev.map(item => ({
        ...item,
        isCorrect: false,
        isIncorrect: false,
        basket: null,
        isDraggable: true,
        isSmall: false
      }));
    });
    toast.info("Game has been reset!");
  };

  useEffect(() => {
    const allSorted = wasteItems.every(item => item.basket !== null);
    if (allSorted && wasteItems.length > 0) {
      setTimeout(() => setGameComplete(true), 1000);
    }
  }, [wasteItems]);

  return {
    score,
    showConfetti,
    gameComplete,
    modalOpen,
    modalMessage,
    wasteItems,
    handleModalOk,
    handleDrop,
    resetGame
  };
};
