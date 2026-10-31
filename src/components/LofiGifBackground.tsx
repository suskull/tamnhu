import React from 'react';

export const LOFI_GIFS = [
  "2yzgWbRc97QOIUpklz",
  "fqtxCwUd2t6dCzILMq",
  "3dhmyq6EKw2x7eFt4X",
  "3oEjHGokRZdOBbcZuo",
  "wKnqovL33x9in9ci6X",
  "KETTXY34XNgWZBxvqx",
  "NKEt9elQ5cR68",
  "Basrh159dGwKY",
  "mJhkYA1gnvY7r481qL",
  "dvreHY4p06lzVSDrvj",
  "8vRvucL4OhyjyM4A8T",
  "gfld3S4CsRXRZjqEj3",
  "7bEpr3NIPNY0E",
  "QLgtN0msAekg3x7YTm",
  "dsd7XbYg0e6hG0A7i8",
  "YRK6HL1CEMUxZHLvjl",
  "YRQfWgn1De4nYLLQBa",
  "NnMH7LDpZTPZS",
  "xUOwGcu6wd0cXBj5n2",
  "3o6nV7ygKBVCmLPpJu",
  "p71BYIPogqBPy",
  "2seKKLp1n0sEeJLYTK",
  "PXj1J0eMONGOA",
  "5torEEM8QnR95Cqg11",
  "He1ppTVuaVSCs",
  "97e6IX0kayYTK",
  "3gTmgzy7wYJfyaGRHQ",
  "3nbxypT20Ulmo",
  "v2WuhMBzb3h5e",
  "ZyFCksxxD9tmLYfGJo",
  "j5zqQSABpeHCU8EpO3",
  "TNTyFBi6r9R6g",
  "7FvaPVEKXuB3O",
  "Wci9oW5MbO6PK",
  "qvkaMMMqyGFjO",
  "4oHyOIBIt57ag",
  "lkceXNDw4Agryfrwz8",
  "SJhhRPXjaTGe5MKz5N",
  "4YZNYcTybcYTnROykG",
  "RcRYrpC1pBvIB0icDm",
  "9LZTcawH3mc8V2oUqk",
  "pVGsAWjzvXcZW4ZBTE",
  "2SYqgPxMm2kbVe3y02",
  "tvU9iTev6uBIQ",
  "H62NM1ab7wzMXURdoi",
  "l1BgQOc1Jj7L86BA4",
  "gH1jGsCnQBiFHWMFzh",
  "11fHSR7hmRLbkA",
  "ckr4W2ppxPBeIF8dx4",
  "vMSXa7KFGx49aeeXhe",
  "ZCZ7FHlu3sPek3h0zP",
  "9jwuxt5bXKadi",
  "6705G9I9sUcNCaJF10",
];

export function getGifUrl(id: string): string {
  return `https://media.lofi.cafe/v1/gifs/${id}.gif`;
}

interface Props {
  gifIndex: number;
  showStatic: boolean;
}

export const LofiGifBackground: React.FC<Props> = ({ gifIndex, showStatic }) => {
  const currentGifId = LOFI_GIFS[gifIndex % LOFI_GIFS.length];
  const nextGifId = LOFI_GIFS[(gifIndex + 1) % LOFI_GIFS.length];

  return (
    <>
      {/* Background GIF */}
      <img
        src={getGifUrl(currentGifId)}
        alt="Lofi background"
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
          objectFit: "cover",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Preload next GIF invisibly without causing scroll overflow */}
      <img
        src={getGifUrl(nextGifId)}
        alt=""
        style={{ position: "fixed", width: 0, height: 0, opacity: 0, pointerEvents: "none" }}
      />

      {/* Static screen effect on station switch */}
      {showStatic && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(255, 255, 255, 0.15)",
            zIndex: 12,
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />
      )}
    </>
  );
};
