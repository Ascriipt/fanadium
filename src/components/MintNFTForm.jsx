import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import contractABI from '../abi/EventCollectible.json';

const CONTRACT_ADDRESS = "";
const PINATA_API_KEY = "";
const PINATA_SECRET_API_KEY = "";

export default function MintNFTForm() {
  const { address, isConnected } = useAccount();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rarity, setRarity] = useState('common');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('');

  const handleMint = async (e) => {
    e.preventDefault();

    if (!isConnected) {
      alert("Veuillez connecter votre wallet avant de mint.");
      return;
    }

    if (!name || !description || !image || !rarity) {
      alert('Tous les champs sont obligatoires.');
      return;
    }

    try {
      // Utiliser Wagmi/ethers via window.ethereum injecté par Socios Wallet ou autre provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      setStatus("📤 Envoi de l'image sur Pinata...");

      const formData = new FormData();
      formData.append('file', image);
      formData.append('pinataMetadata', JSON.stringify({ name: image.name }));

      const resImg = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(PINATA_API_KEY + ':' + PINATA_SECRET_API_KEY)}`,
        },
        body: formData,
      });

      if (!resImg.ok) throw new Error("Erreur lors de l'upload de l'image sur Pinata.");

      const imgResult = await resImg.json();
      const imageUrl = `ipfs://${imgResult.IpfsHash}`;

      setStatus("📦 Génération des métadonnées...");

      const metadata = {
        name,
        description,
        image: imageUrl,
        attributes: [{ trait_type: 'Rarity', value: rarity }],
      };

      const resMeta = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa(PINATA_API_KEY + ':' + PINATA_SECRET_API_KEY)}`,
        },
        body: JSON.stringify(metadata),
      });

      if (!resMeta.ok) throw new Error("Erreur lors de l'upload des métadonnées sur Pinata.");

      const metaResult = await resMeta.json();
      const metadataURI = `ipfs://${metaResult.IpfsHash}`;

      setStatus("🔗 Mint du NFT en cours...");

      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
      const tx = await contract.mintTo(address, metadataURI);
      await tx.wait();

      setStatus("✅ NFT minté avec succès !");
    } catch (err) {
      console.error(err);
      setStatus("❌ Erreur : " + err.message);
    }
  };

  return (
    <form onSubmit={handleMint} className="mint-form">
      <h2>🎨 Créer un NFT avec rareté</h2>

      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <select value={rarity} onChange={(e) => setRarity(e.target.value)} required>
        <option value="common">🟩 Commun</option>
        <option value="rare">🟦 Rare</option>
        <option value="epic">🟪 Épique</option>
        <option value="legendary">🟨 Légendaire</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />

      <button type="submit">Minter</button>
      <p>{status}</p>
    </form>
  );
}
