import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AutomationsTab from "./automations/AutomationsTab";
import SuggestionsTab from "./suggestions/SuggestionsTab";
import LogsTab from "./logs/LogsTab";
const OptimizationTabs: React.FC = () => {
  return (
    <Tabs defaultValue="automations" className="w-full flex items-center">
      <TabsList className="grid grid-cols-3 w-full rounded-sm max-w-lg">
        <TabsTrigger className="rounded-sm" value="automations">
          Automations
        </TabsTrigger>
        <TabsTrigger className="rounded-sm" value="suggestions">
          Suggestions
        </TabsTrigger>
        <TabsTrigger className="rounded-sm" value="logs">
          Optimization Logs
        </TabsTrigger>
      </TabsList>
      <TabsContent value="automations" className="w-full mt-4">
        <AutomationsTab />
      </TabsContent>
      <TabsContent value="suggestions" className="w-full mt-4">
        <SuggestionsTab />
      </TabsContent>
      <TabsContent value="logs" className="w-full mt-4">
        <LogsTab />
      </TabsContent>
    </Tabs>
  );
};

export default OptimizationTabs;
