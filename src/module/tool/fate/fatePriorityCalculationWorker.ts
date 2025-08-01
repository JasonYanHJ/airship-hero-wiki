// 使用 Vite worker 支持的缘分优先级计算 Web Worker
import {
  calculateFateRateUpPriorityData,
  FateRateUpPriorityData,
} from "./fateRateUpPriorityDataService";
import { FateWithRate } from "../../../assets/types";

// Worker 消息类型定义
export interface CalculateMessage {
  type: "calculate";
  id: string;
  data: {
    fatesWithRate: FateWithRate[];
    awakeningAttack: number;
    criticalDamage: number;
  };
}

export interface ResultMessage {
  type: "result";
  id: string;
  data: FateRateUpPriorityData[];
}

export interface ErrorMessage {
  type: "error";
  id: string;
  error: string;
}

export type WorkerMessage = CalculateMessage;
export type WorkerResponse = ResultMessage | ErrorMessage;

// Worker 消息处理器
self.onmessage = function (e: MessageEvent<WorkerMessage>) {
  const { type, id, data } = e.data;

  if (type === "calculate") {
    try {
      const result = calculateFateRateUpPriorityData(
        data.fatesWithRate,
        data.awakeningAttack,
        data.criticalDamage
      );

      const response: ResultMessage = {
        type: "result",
        id,
        data: result,
      };

      self.postMessage(response);
    } catch (error) {
      const errorResponse: ErrorMessage = {
        type: "error",
        id,
        error: error instanceof Error ? error.message : "Unknown error",
      };

      self.postMessage(errorResponse);
    }
  }
};

export {};
