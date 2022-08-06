import { useAddress, useMetamask, useEditionDrop } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';

const App = () => {
  // Use o hook connectWallet que o thirdweb nos dá.
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  console.log("👋 Address:", address);

   // inicializar o contrato editionDrop
   const editionDrop = useEditionDrop("0xa2345777f0F6445Ab6dC34ACa9740187Fb5CFeb3");

   // Variável de estado para sabermos se o usuário tem nosso NFT.
   const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
 
   useEffect(() => {
     // Se ele não tiver uma carteira conectada, saia!
     if (!address) {
       return;
     }
     
     const checkBalance = async () => {
     try {
       const balance = await editionDrop.balanceOf(address, 0);
       // Se o saldo for maior do que 0, ele tem nosso NFT!
       if (balance.gt(0)) {
         setHasClaimedNFT(true);
         console.log("🌟 esse usuário tem o NFT de membro!");
       } else {
         setHasClaimedNFT(false);
         console.log("😭 esse usuário NÃO tem o NFT de membro.");
       }
     } catch (error) {
       setHasClaimedNFT(false);
       console.error("Falha ao ler saldo", error);
     }
   };
   checkBalance();
   }, [address, editionDrop]);

  // Esse é o caso em que o usuário ainda não conectou sua carteira
  // ao nosso webapp. Deixe ele chamar connectWallet.
  if (!address) {
    return (
      <div className="landing">
        <h1>Bem-vind@s à KitePointDAO - a DAO dos amantes de kitesurf e frequentadores do KitePoint</h1>
        <button onClick={connectWithMetamask} className="btn-hero">
          Conecte sua carteira
        </button>
      </div>
    );
  }
  
  // Esse é o caso em que temos o endereço do usuário
  // o que significa que ele conectou sua carteira ao nosso site!
  return (
    <div className="landing">
      <h1>👀 carteira conectada, e agora?!</h1>
    </div>);
};

export default App;