import { Progress } from "@mantine/core"
import { useEffect, useState } from "react";

type TimeTrackerProps = {
    durationMs: number;
    refreshMs: number;
}

export const TimeTracker: React.FC<TimeTrackerProps> = ({durationMs, refreshMs}) => {
    const [startMs] = useState<number>(new Date().getTime());
    const [timePassedMs, setTimePassedMs] = useState<number>(0); 
    const [progress, setProgress] = useState<number>(0); 

    useEffect(() => {
        setProgress(Math.floor(timePassedMs / durationMs * 100));
    }, [timePassedMs]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimePassedMs(new Date().getTime() - startMs);
        }, refreshMs);
         return () => clearInterval(interval);
    }, [durationMs, refreshMs]);

    return (
        <Progress value={progress} size="lg" transitionDuration={200} />
    );
}