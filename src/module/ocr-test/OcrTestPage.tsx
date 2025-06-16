import { PageContainer } from "@ant-design/pro-components";
import { Button, Image, message, Upload } from "antd";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { useEffect, useState } from "react";
import processImageData from "./processImageData";

const OcrTestPage = () => {
  const [imageData, setImageData] = useState<ArrayBuffer | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  const [debugImageData, setDebugImageData] = useState<ArrayBuffer | null>(
    null
  );
  const [debugImageUrl, setDebugImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!fileList[0]) {
      setImageData(null);
      return;
    }

    // 读取文件数据
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target!.result as ArrayBuffer;
      setImageData(arrayBuffer); // 保存 ArrayBuffer 数据，可用于 OpenCV

      message.success("图片上传成功！");
    };

    reader.onerror = () => {
      message.error("文件读取失败！");
    };

    // 读取为 ArrayBuffer
    reader.readAsArrayBuffer(fileList[0].originFileObj!);
  }, [fileList]);

  useEffect(() => {
    if (!imageData) {
      setImageUrl(null);
      return;
    }

    // 创建预览 URL
    const blob = new Blob([imageData]);
    const url = URL.createObjectURL(blob);
    setImageUrl(url);
  }, [imageData]);

  useEffect(() => {
    if (!debugImageData) {
      setImageUrl(null);
      return;
    }

    // 创建预览 URL
    const blob = new Blob([debugImageData]);
    const url = URL.createObjectURL(blob);
    setDebugImageUrl(url);
  }, [debugImageData]);

  const handleBeforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("只能上传图片文件！");
      return Upload.LIST_IGNORE;
    }

    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error("图片大小不能超过 10MB！");
      return Upload.LIST_IGNORE;
    }

    // 阻止默认上传行为
    return false;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    let newFileList = [...info.fileList];

    // 只保留最新的一个文件
    newFileList = newFileList.slice(-1);

    setFileList(newFileList);
  };

  return (
    <PageContainer>
      <Upload
        accept="image/*"
        beforeUpload={handleBeforeUpload}
        onChange={handleChange}
        fileList={fileList}
      >
        <Button>点击上传图片</Button>
      </Upload>
      {imageUrl && imageData && (
        <>
          <br />
          <Button
            onClick={() => processImageData(imageData, setDebugImageData)}
          >
            点击处理图片
          </Button>
          <br />
          <br />
          <Image width={200} src={imageUrl} />
          {debugImageUrl && <Image width={200} src={debugImageUrl} />}
        </>
      )}
    </PageContainer>
  );
};

export default OcrTestPage;
