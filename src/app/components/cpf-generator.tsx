"use client";

import React, { useState, useEffect } from "react";
import { Alert } from "reactstrap";
import copy from "../../../public/copy.svg";
import sync from "../../../public/sync.svg";
import Image from "next/image";

const generateCPF = (): string => {
  const randomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const generateDigit = (base: number[]): number => {
    const sum = base.reduce(
      (acc, curr, index) => acc + curr * (base.length + 1 - index),
      0
    );
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const base = Array.from({ length: 9 }, () => randomInt(0, 9));
  const digit1 = generateDigit(base);
  const digit2 = generateDigit([...base, digit1]);

  return `${base.join("")}${digit1}${digit2}`;
};

const formatCPF = (cpf: string): string => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

const CPFGenerator: React.FC = () => {
  const [cpf, setCpf] = useState<string>(generateCPF());
  const [isFormatted, setIsFormatted] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const copyToClipboard = () => {
    const cpfToCopy = isFormatted ? formatCPF(cpf) : cpf;
    navigator.clipboard.writeText(cpfToCopy).then(() => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem",
          marginTop: isMobile ? "2rem" : "0",
          gap: isMobile ? "1rem" : "0",
        }}
      >
        <div
          style={{
            display: isMobile ? "flex" : "inline-flex",
            alignItems: "center",
            marginBottom: "1rem",
            gap: "2rem",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <input
            type="text"
            value={isFormatted ? formatCPF(cpf) : cpf}
            readOnly
            style={{
              fontSize: isMobile ? "1.15rem" : "1.3rem",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              textAlign: "center",
              width: isMobile ? "230px" : "250px",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
            }}
          >
            <button
              onClick={() => setCpf(generateCPF())}
              style={{
                width: 40,
                height: 40,
                border: "1px solid gray",
              }}
            >
              <Image src={sync} alt="Gerar" width={30} height={30} />
            </button>
            <button
              onClick={copyToClipboard}
              style={{ width: 40, height: 40, border: "1px solid gray" }}
            >
              <Image src={copy} alt="Copiar" width={30} height={30} />
            </button>
          </div>
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginBottom: "1rem",
            padding: "0.5rem",
          }}
        >
          <input
            type="checkbox"
            checked={isFormatted}
            onChange={() => setIsFormatted(!isFormatted)}
            style={{
              width: "30px",
              height: "15px",
            }}
          />
          <label style={{ marginLeft: "0.2rem" }}>Com pontuação</label>
        </div>
      </div>
      {showAlert && (
        <Alert color="success" style={{ color: "green" }}>
          <strong>Copiado!</strong>
        </Alert>
      )}
    </div>
  );
};

export default CPFGenerator;
