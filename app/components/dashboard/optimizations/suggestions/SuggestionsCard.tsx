import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Suggestion } from "./types";
import { ChartLine, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypographyP, TypographySmall } from "@/app/components/ui/Typography";

interface SuggestionsCardProps {
  suggestion: Suggestion;
}

const SuggestionsCard: React.FC<SuggestionsCardProps> = ({ suggestion }) => {
  // const actions = [
  //   { title: "Action 1", info: "Additional Information" },
  //   { title: "Action 2", info: "Additional Information" },
  //   { title: "Action 3", info: "Additional Information" },
  // ];

  return (
    <Card className="rounded-sm shadow-none gap-2 max-w-sm">
      <CardHeader className="!pb-0">
        <CardTitle className="text-sm">{suggestion.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 items-center">
          <ChartLine size={24} />
          <div>
            <TypographySmall className="font-medium">
              Estimated Impact
            </TypographySmall>
            <TypographyP className="text-slate-500">
              {suggestion.impactValue}% {suggestion.impactEstimate}
            </TypographyP>
          </div>
        </div>
        <div className="bg-slate-100 rounded-sm mt-4 p-2">
          <div className="flex justify-between items-center border-b border-slate-300 pb-2">
            <div>
              <TypographySmall className="font-medium">
                Suggested Strategies
              </TypographySmall>
              <TypographyP className="text-slate-500">
                {suggestion.strategy}
              </TypographyP>
            </div>
            <User className="w-4 text-slate-600 flex-none" />
          </div>

          <div className="mt-2">
            <TypographySmall className="font-medium pt-2">
              Actions
            </TypographySmall>

            {/* Lista de acciones en formato timeline */}
            <div className="mt-2 space-y-4">
              {suggestion.actions.map((action, index, arr) => (
                <div key={index} className="relative pl-8">
                  {/* Columna izquierda: bullet y línea vertical */}
                  <div className="absolute left-2 top-2 flex flex-col items-center">
                    <div className="w-2 h-2 bg-slate-500 rounded-full" />
                    {index !== arr.length - 1 && (
                      <div className="w-0.5 h-14 bg-slate-500" />
                    )}
                  </div>

                  {/* Contenido de la acción */}
                  <TypographySmall className="font-medium pt-1">
                    {action.name}
                  </TypographySmall>
                  <TypographyP className="text-slate-500">
                    {action.description}
                  </TypographyP>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex w-full items-center gap-2 justify-end">
        <Button className="rounded-sm shadow-none" variant="outline">
          Dismiss
        </Button>
        <Button className="rounded-sm shadow-none">Accept</Button>
      </CardFooter>
    </Card>
  );
};

export default SuggestionsCard;
