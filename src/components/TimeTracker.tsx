import { Progress } from "@mantine/core";
import { useEffect, useState } from "react";

type TimeTrackerProps = {
  durationMs: number;
  refreshMs: number;
};

export const TimeTracker: React.FC<TimeTrackerProps> = ({
  durationMs,
  refreshMs,
}) => {
  const [startMs] = useState<number>(new Date().getTime());
  const [timePassedMs, setTimePassedMs] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setProgress(Math.min(Math.floor((timePassedMs / durationMs) * 100), 100));
  }, [timePassedMs]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimePassedMs(new Date().getTime() - startMs);
    }, refreshMs);
    return () => clearInterval(interval);
  }, [durationMs, refreshMs]);

  const getColor = (progress: number) => {
    if (progress < 50) {
      return "green";
    }
    if (progress < 75) {
      return "yellow";
    }
    if (progress < 90) {
      return "orange";
    }
    return "red";
  };

  return (
    <Progress.Root size="xl" transitionDuration={refreshMs}>
      <Progress.Section value={progress} color={getColor(progress)}>
        <Progress.Label >{Math.round((durationMs - timePassedMs) / 1000)}s</Progress.Label>
      </Progress.Section>
    </Progress.Root>

    // <Progress value={progress} color={getColor(progress)} size="xl" transitionDuration={refreshMs} />
  );
};
