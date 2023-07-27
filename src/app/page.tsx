"use client";

import { FormEvent, useState } from "react";
import { Cohort } from "@nucypher/nucypher-ts";

export default function Home() {
  const [plaintext, setPlaintext] = useState("");
  const [address, setAddress] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [status, setStatus] = useState("waiting");

  const handleEncrypt = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("encrypting");
    const config = {
      threshold: 3,
      shares: 5,
      porterUri: "https://porter-tapir.nucypher.community",
    };

    const newCohort = await Cohort.create(config);
    // TODO: encrypt the plaintext

    setTimeout(() => {
      setStatus("encrypted");
    }, 1500);
  };

  const handleDecrypt = () => {
    setStatus("decrypted");
    // TODO: decrypt
    setDecrypted(plaintext);
  };

  return (
    <>
      <h1>nucypher-ts simple demo</h1>
      <form onSubmit={handleEncrypt}>
        <textarea
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
        />
        <br />
        <input value={address} onChange={(e) => setAddress(e.target.value)} />
        <br />
        <button
          disabled={
            plaintext.length === 0 ||
            address.length === 0 ||
            status === "encrypting"
          }
        >
          Encrypt
        </button>
        <p>Status: {status}</p>
      </form>
      <button onClick={handleDecrypt} disabled={status !== "encrypted"}>
        Decrypt
      </button>
      <p>{decrypted}</p>
    </>
  );
}
