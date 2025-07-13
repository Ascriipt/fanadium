// hooks/useMintTemplateNFT.ts
import { useAccount, useWalletClient } from "wagmi"
import { useState } from "react"
import { ethers } from "ethers"
import contractABI from "../app/abi/EventCollectible.json"

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!
const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY!
const PINATA_SECRET_API_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY!

const rarities = ["common", "rare", "epic", "legendary"]

function getRandomRarity() {
  return rarities[Math.floor(Math.random() * rarities.length)]
}

export function useMintTemplateNFT() {
  const { address, isConnected } = useAccount()
  const { data: walletClient } = useWalletClient()
  const [status, setStatus] = useState("")

  const mint = async () => {
    if (!isConnected) {
      alert("Veuillez connecter votre wallet avant de mint.")
      return
    }

    if (!walletClient) {
      alert("Wallet non prêt. Veuillez réessayer.")
      return
    }

    try {
      setStatus("Préparation du mint...")

      const provider = new ethers.BrowserProvider(walletClient.transport)
      const signer = await provider.getSigner()

      const name = `Template NFT_${Math.floor(Math.random() * 10000)}`
      const description = "A randomly generated NFT with random rarity."
      const rarity = getRandomRarity()

      const imageResponse = await fetch("/tennis.png") // Note: `/public/tennis.png` is served as `/tennis.png`
      const imageBlob = await imageResponse.blob()
      const file = new File([imageBlob], "template.png", { type: imageBlob.type })

      const formData = new FormData()
      formData.append("file", file)
      formData.append("pinataMetadata", JSON.stringify({ name: "template.png" }))

      const resImg = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(PINATA_API_KEY + ":" + PINATA_SECRET_API_KEY)}`,
        },
        body: formData,
      })

      if (!resImg.ok) throw new Error("Erreur lors de l'upload de l'image.")

      const imgResult = await resImg.json()
      const imageUrl = `ipfs://${imgResult.IpfsHash}`

      setStatus("📦 Génération des métadonnées...")

      const metadata = {
        name,
        description,
        image: imageUrl,
        attributes: [{ trait_type: "Rarity", value: rarity }],
      }

      const resMeta = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(PINATA_API_KEY + ":" + PINATA_SECRET_API_KEY)}`,
        },
        body: JSON.stringify(metadata),
      })

      if (!resMeta.ok) throw new Error("Erreur lors de l'upload des métadonnées sur Pinata.")

      const metaResult = await resMeta.json()
      const metadataURI = `ipfs://${metaResult.IpfsHash}`

      setStatus("📤 Mint du NFT en cours...")

      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer)
      const tx = await contract.mintTo(address, metadataURI)
      await tx.wait()

      setStatus(`✅ NFT minté avec succès ! Rareté : ${rarity}`)
      alert(`✅ NFT minté avec succès ! Rareté : ${rarity}`)
    } catch (err: any) {
      console.error(err)
      setStatus("❌ Erreur : " + (err.message ?? err.toString()))
      alert("❌ " + (err.message ?? err.toString()))
    }
  }

  return { mint, status }
}
