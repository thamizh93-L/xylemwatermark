import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ReactConfetti from "react-confetti";

interface GameCompleteProps {
  score: number;
  totalItems: number;
  onReset: () => void;
  onSubmit: () => void;
}

const GameComplete = ({ score, totalItems, onReset, onSubmit }: GameCompleteProps) => {
  const maxScore = totalItems * 10;
  const percentage = Math.round((score / maxScore) * 100);
  
  let message = "";
  if (percentage === 100) {
    message = "Perfect! You're a waste sorting champion!";
  } else if (percentage >= 80) {
    message = "Great job! You're becoming a waste sorting expert!";
  } else if (percentage >= 60) {
    message = "Good work! Keep practicing to improve your sorting skills.";
  } else {
    message = "Keep learning about waste types to improve your score!";
  }
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <ReactConfetti recycle={false} numberOfPieces={300} />
      <Card className="max-w-md w-full bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Game Complete!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-4">
            <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              {score} / {maxScore}
            </span>
            <p className="text-xl mt-1">{percentage}% Correct</p>
          </div>
          <p className="text-gray-700">{message}</p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button 
            onClick={onSubmit}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
          >
            Submit Results
          </Button>
          <Button 
            onClick={onReset} 
            variant="outline"
            className="w-full"
          >
            Play Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GameComplete;
