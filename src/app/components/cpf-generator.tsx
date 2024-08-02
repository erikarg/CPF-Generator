"use client";

import React, { useState } from "react";
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
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem",
            marginRight: "1rem",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginBottom: "1rem",
              gap: "2rem",
            }}
          >
            <input
              type="text"
              value={isFormatted ? formatCPF(cpf) : cpf}
              readOnly
              style={{
                fontSize: "1.3rem",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                textAlign: "center",
                width: "250px",
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
                style={{ width: 40, height: 40 }}
              >
                <Image src={sync} alt="Gerar" width={30} height={30} />
              </button>
              <button
                onClick={copyToClipboard}
                style={{ width: 40, height: 40 }}
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
                width: "80px",
                height: "40px",
              }}
            />
            <label style={{ marginLeft: "-3rem" }}>Com pontuação</label>
          </div>
        </div>
      </div>
      {showAlert && (
        <Alert color="success" style={{ marginBottom: "1rem" }}>
          <span className="alert-icon">
            <i className="ni ni-like-2"></i>
          </span>
          <strong>Copiado para a área de transferência!</strong>
        </Alert>
      )}
    </div>
  );
};

export default CPFGenerator;
