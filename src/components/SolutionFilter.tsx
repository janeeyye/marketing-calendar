import { Button } from "@/components/ui/button";
import { Solution, SOLUTIONS, getSolutionColor } from "@/lib/types";

interface SolutionFilterProps {
  activeFilters: Set<Solution>;
  onToggleFilter: (solution: Solution) => void;
}

export const SolutionFilter = ({ activeFilters, onToggleFilter }: SolutionFilterProps) => {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-base font-semibold text-foreground">Filter:</span>
      {SOLUTIONS.map((solution) => {
        const isActive = activeFilters.has(solution);
        const color = getSolutionColor(solution);
        
        return (
          <Button
            key={solution}
            onClick={() => onToggleFilter(solution)}
            className="rounded-full px-5 py-2.5 h-auto text-base font-medium transition-all duration-200"
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
