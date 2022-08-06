import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0xa2345777f0F6445Ab6dC34ACa9740187Fb5CFeb3");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "KiteWave",
        description: "Esse NFT vai te dar acesso ao KitePointDAO!",
        image: readFileSync("scripts/assets/kitesurf.jpg"),
      },
    ]);
    console.log("✅ Novo NFT criado com sucesso no !");
  } catch (error) {
    console.error("falha ao criar o novo NFT", error);
  }
})()