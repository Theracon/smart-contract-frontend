// @ts-nocheck
import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

import { abi, contractAddresses } from "../constants"

export default function LotteryEntrance() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
  const chainId = parseInt(chainIdHex)
  const lotteryAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
  const [entranceFee, setEntranceFee] = useState("0")
  const [numPlayers, setNumPlayers] = useState("0")
  const [recentWinner, setRecentWinner] = useState("0")

  const dispatch = useNotification()

  const {
    runContractFunction: enterLottery,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi,
    contractAddress: lotteryAddress,
    functionName: "enterLottery",
    params: {},
    msgValue: entranceFee,
  })

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi,
    contractAddress: lotteryAddress,
    functionName: "getEntranceFee",
    params: {},
  })

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi,
    contractAddress: lotteryAddress,
    functionName: "getNumberOfPlayers",
    params: {},
  })

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi,
    contractAddress: lotteryAddress,
    functionName: "getRecentWinner",
    params: {},
  })

  async function updateUI() {
    const entranceFeeFromContract = (
      await getEntranceFee({
        onSuccess: () => console.log("Got entrance fee sucessfully"),
        onError: (error) => console.log("From getEntranceFee():", error),
      })
    ).toString()
    const numPlayersFromContract = (
      await getNumberOfPlayers({
        onSuccess: () => console.log("Got number of players sucessfully"),
        onError: (error) => console.log("From getNumberOfPlayers():", error),
      })
    ).toString()
    const recentWinnerFromContract = (
      await getRecentWinner({
        onSuccess: () => console.log("Got recent winner sucessfully"),
        onError: (error) => console.log("From getRecentWinner():", error),
      })
    ).toString()

    setEntranceFee(entranceFeeFromContract)
    setNumPlayers(numPlayersFromContract)
    setRecentWinner(recentWinnerFromContract)
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI()
    }
  }, [isWeb3Enabled])

  const handleSuccess = async function (tx) {
    await tx.wait(1)
    handleNewNotification("info", "Transation Complete!")
    updateUI()
  }

  const handleError = async function (err) {
    handleNewNotification("danger", "Transaction could not complete!")
  }

  const handleNewNotification = function (type, message) {
    dispatch({
      type: type,
      title: "Notification",
      message,
      position: "topR",
      icon: "🔔",
    })
  }

  return (
    <div className="tw-p-5">
      <h3 className="tw-font-bold">Lottery Gateway</h3>
      {lotteryAddress ? (
        <div>
          <p>Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH</p>
          <p>Number of Players: {numPlayers}</p>
          <p>Recent Winner: {`${recentWinner.slice(0, 6)}...${recentWinner.slice(-6)}`}</p>

          <button
            className="tw-ml-auto tw-p-2 tw-px-4 tw-rounded-md tw-text-orange tw-border-solid tw-border-2 tw-border-indigo-600 tw-mt-5"
            onClick={async function () {
              await enterLottery({
                onSuccess: handleSuccess,
                onError: (error) => handleError(JSON.stringify(error)),
              })
            }}
            disabled={isLoading || isFetching}
          >
            {isLoading || isFetching ? (
              <div className="tw-animate-spin tw-spinner-border tw-h-8 tw-w-8 tw-border-b-2 tw-rounded-full"></div>
            ) : (
              <div>Enter Lottery!</div>
            )}
          </button>
        </div>
      ) : (
        <p>No wallet addresses detected!</p>
      )}
    </div>
  )
}
