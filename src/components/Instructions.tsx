
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Instructions = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle>How to Play</CardTitle>
        <CardDescription>Learn about waste sorting while having fun!</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-1">
          <li>Drag each waste item to its correct recycling bin</li>
          <li><span className="text-green-600 font-medium">+10 points</span> for correct sorting</li>
          <li><span className="text-red-600 font-medium">-5 points</span> for incorrect sorting</li>
          <li>Try to get the highest score by sorting all items correctly</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default Instructions;
