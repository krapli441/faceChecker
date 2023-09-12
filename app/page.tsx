"use client";
// Next 라이브러리
import { useRef, useState } from "react";

// CSS
import styles from "./page.module.css";

// Chakra UO
import { Box, Button, Text, Input, Heading } from "@chakra-ui/react";

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

const uploadStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function Home() {
  const [fileName, setFileName] = useState("선택된 파일 없음");
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      console.log("파일 업로드 완료: ", file);
    }
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
            ref={hiddenFileInput}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <Button
            colorScheme="blackAlpha"
            onClick={() => console.log("CLICK!")}
          >
            얼굴 찾기
          </Button>
        </Box>
      </Box>
    </>
  );
}
