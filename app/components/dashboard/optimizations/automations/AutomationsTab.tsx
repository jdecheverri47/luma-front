// AutomationsTab.tsx
"use client";
import { useState, useEffect } from "react";
import AutomationsCard from "./AutomationsCard";
import { Automation } from "./types";

const AutomationsTab: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [automations, setAutomations] = useState<Automation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://dev.api.lumasystems.ai/v1/optimizations/automations?page=1&page_size=10"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        // Assuming the API returns { automations: Automation[], pageInfo: {...} }
        setAutomations(result.automations);
      } catch (err: any) {
        setError(err.message || "Fetch error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (automations.length === 0) {
    return <div>No automations available</div>;
  }

  return (
    <div className="">
      {automations.map((automation) => (
        <AutomationsCard key={automation.id} automation={automation} />
      ))}
    </div>
  );
};

export default AutomationsTab;
