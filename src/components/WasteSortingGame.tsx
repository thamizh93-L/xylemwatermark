
import React from "react";
import ReactConfetti from "react-confetti";
import GameComplete from "./GameComplete";
import Instructions from "./Instructions";
import { Button } from "@/components/ui/button";
import EducationalMessageDialog from "./EducationalMessageDialog";
import GamePlayArea from "./GamePlayArea";
import { useWasteSortingGame } from "@/hooks/useWasteSortingGame";

const WasteSortingGame = () => {
  const { 
    score, 
    showConfetti, 
    gameComplete, 
    modalOpen, 
    modalMessage, 
    wasteItems, 
    handleModalOk, 
    handleDrop, 
    resetGame 
  } = useWasteSortingGame();

  const handleFormSubmission = () => {
    window.location.href = "https://forms.office.com/r/JCBxhrZq14";
  };

  return (
    <div className="max-w-4xl mx-auto">
      <EducationalMessageDialog
        open={modalOpen}
        message={modalMessage}
        onOk={handleModalOk}
      />
      {showConfetti && <ReactConfetti recycle={false} numberOfPieces={200} />}
      {gameComplete && (
        <GameComplete 
          score={score} 
          totalItems={wasteItems.length} 
          onReset={resetGame}
          onSubmit={handleFormSubmission}
        />
      )}
      <h1 className="text-4xl font-bold mb-4 text-center">Eco Sort</h1>
      <p className="text-xl text-center text-muted-foreground mb-8">Learn about waste sorting while having fun!</p>
      <Instructions />
      <div className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        Score: {score}
      </div>
      <GamePlayArea 
        wasteItems={wasteItems} 
        onDrop={handleDrop} 
      />
      <div className="flex justify-center">
        <Button 
          size="lg"
          className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" 
          onClick={resetGame}
        >
          Reset Game
        </Button>
      </div>
    </div>
  );
};

export default WasteSortingGame;
