import { useCallback, useEffect, useRef, useState } from "react";
import { FateWithRate } from "../../../assets/types";
import { FateRateUpPriorityData } from "./fateRateUpPriorityDataService";
import FatePriorityWorker from "./fatePriorityCalculationWorker?worker&inline";
import {
  CalculateMessage,
  WorkerResponse,
} from "./fatePriorityCalculationWorker";

interface CalculationParams {
  fatesWithRate: FateWithRate[];
  awakeningAttack: number;
  criticalDamage: number;
}

interface UseFatePriorityCalculationResult {
  data: FateRateUpPriorityData[] | null;
  loading: boolean;
  error: string | null;
  calculate: (params: CalculationParams) => void;
}

export function useFatePriorityCalculation(): UseFatePriorityCalculationResult {
  const [data, setData] = useState<FateRateUpPriorityData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const workerRef = useRef<Worker | null>(null);
  const currentRequestIdRef = useRef<string | null>(null);

  // 初始化 worker
  useEffect(() => {
    workerRef.current = new FatePriorityWorker();

    const handleMessage = (e: MessageEvent<WorkerResponse>) => {
      const { type, id } = e.data;

      // 只处理当前请求的响应
      if (id !== currentRequestIdRef.current) return;

      if (type === "result") {
        setData(e.data.data);
        setLoading(false);
        setError(null);
      } else if (type === "error") {
        setError(e.data.error);
        setLoading(false);
        setData(null);
      }
    };

    workerRef.current.onmessage = handleMessage;

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  const calculate = useCallback((params: CalculationParams) => {
    if (!workerRef.current) return;

    const requestId = Math.random().toString(36).substr(2, 9);
    currentRequestIdRef.current = requestId;

    setLoading(true);
    setError(null);

    const message: CalculateMessage = {
      type: "calculate",
      id: requestId,
      data: params,
    };

    workerRef.current.postMessage(message);
  }, []);

  return {
    data,
    loading,
    error,
    calculate,
  };
}
