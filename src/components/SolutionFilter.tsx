import { Button } from "@/components/ui/button";
import { Solution, SOLUTIONS, getSolutionColor } from "@/lib/types";

interface SolutionFilterProps {
  activeFilters: Set<Solution>;
  onToggleFilter: (solution: Solution) => void;
}

export const SolutionFilter = ({ activeFilters, onToggleFilter }: SolutionFilterProps) => {
  const hasOtherSolutionActive = 
    activeFilters.has("AI Business Solutions") ||
    activeFilters.has("Cloud and AI Platforms") ||
    activeFilters.has("Security");

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm font-semibold text-foreground">Filter:</span>
      {SOLUTIONS.map((solution) => {
        let isActive = activeFilters.has(solution);
        
        if (solution === "All CSAs" && hasOtherSolutionActive) {
          isActive = true;
        }
        
        const color = getSolutionColor(solution);
        
        return (
          <Button
            key={solution}
            onClick={() => onToggleFilter(solution)}
            className="rounded-full px-4 py-2 h-auto text-sm font-medium transition-all duration-200"
            style={
              isActive
                ? {
                    backgroundColor: color,
                    color: 'white',
                    border: 'none',
                  }
                : {
                    backgroundColor: 'white',
                    color: color,
                    border: `2px solid ${color}`,
                  }
            }
          >
            {solution}
          </Button>
        );
      })}
    </div>
  );
};
