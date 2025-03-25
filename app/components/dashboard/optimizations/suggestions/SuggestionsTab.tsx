// AutomationsTab.tsx
"use client";
import SuggestionsCard from "./SuggestionsCard";

const suggestion = {
  id: "1",
  clientId: "1",
  title: "Improvement Connection",
  impactValue: 50,
  impactEstimate: "Enhanced performance and stability",
  strategy: "Switching from wifi to ethernet can enhance speed and stability",
  actions: [
    {
      name: "Switch to a Wired Connection.",
      description:
        "Using an ethernet cable instead of Wi-Fi reduces interferences, improve connection reliability, and provides faster data transder rates.",
    },
  ],
  status: "DISMISSED" as "DISMISSED",
};

const SuggestionsTab: React.FC = () => {
  return (
    <div className="w-fit">
      <SuggestionsCard suggestion={suggestion} />
    </div>
  );
};

export default SuggestionsTab;
