import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Highlight, OnDemand, QuickLink } from "@/lib/types";
import { Plus, PencilSimple, Trash, ArrowSquareOut } from "@phosphor-icons/react";

interface SidebarContentProps {
  highlights: Highlight[];
  onDemands: OnDemand[];
  quickLinks: QuickLink[];
  onAddHighlight: () => void;
  onEditHighlight: (highlight: Highlight) => void;
  onDeleteHighlight: (id: string) => void;
  onAddOnDemand: () => void;
  onEditOnDemand: (onDemand: OnDemand) => void;
  onDeleteOnDemand: (id: string) => void;
  onAddQuickLink: () => void;
  onEditQuickLink: (quickLink: QuickLink) => void;
  onDeleteQuickLink: (id: string) => void;
}

export const SidebarContent = ({
  highlights,
  onDemands,
  quickLinks,
  onAddHighlight,
  onEditHighlight,
  onDeleteHighlight,
  onAddOnDemand,
  onEditOnDemand,
  onDeleteOnDemand,
  onAddQuickLink,
  onEditQuickLink,
  onDeleteQuickLink,
}: SidebarContentProps) => {
  const sortedHighlights = [...highlights].sort((a, b) => a.displayOrder - b.displayOrder);
  const sortedOnDemands = [...onDemands].sort((a, b) => a.displayOrder - b.displayOrder);
  const sortedQuickLinks = [...quickLinks].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Highlights</h2>
          <Button
            onClick={onAddHighlight}
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90 h-8 px-3 text-xs"
          >
            <Plus size={16} weight="bold" className="mr-1" />
            Add
          </Button>
        </div>

        {sortedHighlights.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">No highlights yet</p>
        ) : (
          <div className="flex flex-col gap-3">
            {sortedHighlights.map((highlight) => (
              <Card key={highlight.id} className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-muted-foreground">#{highlight.displayOrder}</span>
                      <h3 className="text-sm font-semibold">{highlight.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{highlight.meta}</p>
                    <p className="text-sm text-foreground mb-2">{highlight.description}</p>
                    {highlight.url && (
                      <a
                        href={highlight.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        <ArrowSquareOut size={14} weight="bold" />
                        View Link
                      </a>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => onEditHighlight(highlight)}
                    >
                      <PencilSimple size={16} weight="bold" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={() => onDeleteHighlight(highlight.id)}
                    >
                      <Trash size={16} weight="bold" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">On-demand</h2>
          <Button
            onClick={onAddOnDemand}
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90 h-8 px-3 text-xs"
          >
            <Plus size={16} weight="bold" className="mr-1" />
            Add
          </Button>
        </div>

        {sortedOnDemands.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">No on-demand items yet</p>
        ) : (
          <div className="flex flex-col gap-3">
            {sortedOnDemands.map((onDemand) => (
              <Card key={onDemand.id} className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-muted-foreground">#{onDemand.displayOrder}</span>
                      <h3 className="text-sm font-semibold">{onDemand.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{onDemand.meta}</p>
                    {onDemand.url && (
                      <a
                        href={onDemand.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        <ArrowSquareOut size={14} weight="bold" />
                        View Link
                      </a>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => onEditOnDemand(onDemand)}
                    >
                      <PencilSimple size={16} weight="bold" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={() => onDeleteOnDemand(onDemand.id)}
                    >
                      <Trash size={16} weight="bold" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Quick Links</h2>
          <Button
            onClick={onAddQuickLink}
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90 h-8 px-3 text-xs"
          >
            <Plus size={16} weight="bold" className="mr-1" />
            Add
          </Button>
        </div>

        {sortedQuickLinks.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">No quick links yet</p>
        ) : (
          <div className="flex flex-col gap-2">
            {sortedQuickLinks.map((quickLink) => (
              <div
                key={quickLink.id}
                className="flex items-center justify-between gap-2 p-3 bg-card border border-border rounded-lg hover:bg-accent/10 transition-colors"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-xs font-medium text-muted-foreground shrink-0">#{quickLink.displayOrder}</span>
                  <h3 className="text-sm font-medium truncate">{quickLink.title}</h3>
                  {quickLink.url && (
                    <a
                      href={quickLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ArrowSquareOut size={16} weight="bold" />
                    </a>
                  )}
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => onEditQuickLink(quickLink)}
                  >
                    <PencilSimple size={16} weight="bold" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    onClick={() => onDeleteQuickLink(quickLink.id)}
                  >
                    <Trash size={16} weight="bold" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
