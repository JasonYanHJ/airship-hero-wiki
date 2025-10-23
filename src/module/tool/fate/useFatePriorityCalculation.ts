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
  excludedHeros: string[];
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

  const handleMessage = useCallback((e: MessageEvent<WorkerResponse>) => {
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

    // 计算完成后立即释放 Worker
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  }, []);

  // 清理函数
  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  const calculate = useCallback(
    (params: CalculationParams) => {
      // 如果有正在运行的 Worker，先终止它
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }

      // 创建新的 Worker
      workerRef.current = new FatePriorityWorker();
      workerRef.current.onmessage = handleMessage;

      const requestId = Math.random().toString(36).substring(2, 9);
      currentRequestIdRef.current = requestId;

      setLoading(true);
      setError(null);

      const message: CalculateMessage = {
        type: "calculate",
        id: requestId,
        data: params,
      };

      workerRef.current.postMessage(message);
    },
    [handleMessage]
  );

  return {
    data,
    loading,
    error,
    calculate,
  };
}
