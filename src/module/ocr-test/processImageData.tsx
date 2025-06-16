import { message } from "antd";
import cvReadyPromise from "@techstark/opencv-js";

async function main(canvas: HTMLCanvasElement) {
  // 导入 @techstark/opencv-js
  const cv = await cvReadyPromise;

  // 从 canvas 创建 OpenCV Mat
  const srcMat = cv.imread(canvas);

  // 创建灰度图 Mat
  const grayMat = new cv.Mat();

  // 转换为灰度图
  cv.cvtColor(srcMat, grayMat, cv.COLOR_RGBA2GRAY);

  // 将图像显示到 canvas，便于调试
  cv.imshow(canvas, grayMat);
  // 也可以使用控制台打印调试信息
  console.log("调试输出:", { 莫心: 5, 阿尔比: 10 });

  // 清理资源
  srcMat.delete();
  grayMat.delete();
}

async function processImageData(
  imageData: ArrayBuffer, // 用户上传图片的数据
  setDebugImageData: (imageData: ArrayBuffer) => void // 设置调试图片数据
) {
  try {
    message.loading("正在处理图片...", 0);

    // 创建一个临时的 Image 元素来加载图片
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    // 创建图片 URL
    const blob = new Blob([imageData]);
    const imgUrl = URL.createObjectURL(blob);

    // 等待图片加载完成
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = imgUrl;
    });

    // 设置 canvas 尺寸
    canvas.width = img.width;
    canvas.height = img.height;

    // 将图片绘制到 canvas
    ctx.drawImage(img, 0, 0);

    // 图片处理主程序
    await main(canvas);

    // 将 canvas 转换为 Blob
    const grayBlob: Blob | null = await new Promise((resolve) => {
      canvas.toBlob(resolve, "image/png");
    });

    // 读取 Blob 为 ArrayBuffer
    const grayArrayBuffer = await grayBlob!.arrayBuffer();

    // 更新图片数据和预览
    setDebugImageData(grayArrayBuffer);

    // 清理资源
    URL.revokeObjectURL(imgUrl);

    message.destroy();
    message.success("图片处理完成");
  } catch (error) {
    message.destroy();
    message.error(
      "图片处理失败: " + (error instanceof Error ? error.message : "未知错误")
    );
    console.error("OpenCV 错误:", error);
  }
}

export default processImageData;
