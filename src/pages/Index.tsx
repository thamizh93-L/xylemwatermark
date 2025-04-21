
import WasteSortingGame from "@/components/WasteSortingGame";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-10 px-4">
      <div className="container mx-auto">
        <WasteSortingGame />
      </div>
      <footer className="text-center mt-10 text-gray-500 text-sm">
        <p>© 2025 Eco Sort - Learn about waste management</p>
      </footer>
    </div>
  );
};

export default Index;
