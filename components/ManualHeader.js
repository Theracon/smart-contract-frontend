// @ts-nocheck
import { useEffect } from "react"
import { useMoralis } from "react-moralis"

export default function Home() {
  const { enableWeb3, account, isWeb3Enabled, isWeb3EnableLoading, Moralis, deactivateWeb3 } =
    useMoralis()

  useEffect(() => {
    if (isWeb3Enabled) return
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("connected")) enableWeb3()
    }
  }, [isWeb3Enabled])

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      if (!account) {
        window.localStorage.removeItem("connected")
        deactivateWeb3()
        console.log("No account detected.")
      } else {
        console.log(
          `Account changed to: ${account.slice(0, 6)}...${account.slice(account.length - 4)}`
        )
      }
    })
  }, [])

  return (
    <div>
      {account ? (
        <div>
          Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
        </div>
      ) : (
        <button
          onClick={async () => {
            await enableWeb3()
            if (typeof window !== "undefined") window.localStorage.setItem("connected", "injected")
          }}
          disabled={isWeb3EnableLoading}
        >
          Connect
        </button>
      )}
    </div>
  )
}
