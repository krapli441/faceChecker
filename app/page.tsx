"use client";
// Next 라이브러리
import { useRef, useState, ChangeEvent, useEffect } from "react";

// CSS
import styles from "./page.module.css";

// Chakra UI
import { Box, Button, Text, Input, Heading, Image } from "@chakra-ui/react";

// face-api.js
import * as faceapi from "face-api.js";

const contentsStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "80vw",
  height: "80vh",
  backgroundColor: "white",
  color: "black",
  gap: "5vh",
};

// const uploadStyle = {
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// };

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("선택된 파일 없음");
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadModels = async () => {
      const faceapi = await import("face-api.js");
      await faceapi.nets.tinyFaceDetector.loadFromUri("/weights");
    };
    loadModels();
  }, []);

  const handleFindFace = async () => {
    const imageElement = document.getElementById(
      "uploaded-image"
    ) as HTMLImageElement;

    if (!imageElement) {
      console.log("이미지가 로드되지 않았습니다.");
      return;
    }
    // 얼굴 인식
    const detections = await faceapi.detectAllFaces(
      imageElement,
      new faceapi.TinyFaceDetectorOptions()
    );

    // 결과 처리
    if (detections.length > 0) {
      console.log("인식된 얼굴 수: ", detections.length);
      console.log("첫 번째 얼굴의 위치: ", detections[0].box);
    } else {
      console.log("인식된 얼굴이 없습니다.");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageSrc(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImageSrc(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  return (
    <>
      <Box className={styles.main}>
        <Box
          className="contents"
          style={contentsStyle}
          flexDirection={"column"}
        >
          <Heading color={"black"}>FACE CHECKER</Heading>
          <Button colorScheme="blackAlpha" onClick={handleClick}>
            파일 업로드
          </Button>
          <Input
            type="file"
            accept=".jpg, .jpeg, .png"
            ref={hiddenFileInput}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          {imageSrc && (
            <Image
              boxSize={"400px"}
              id="uploaded-image"
              src={imageSrc}
              alt="Uploaded Preview"
            />
          )}
          <Button colorScheme="blackAlpha" onClick={() => handleFindFace()}>
            얼굴 찾기
          </Button>
        </Box>
      </Box>
    </>
  );
}
