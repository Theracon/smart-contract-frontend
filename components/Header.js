// @ts-nocheck
import { ConnectButton } from "web3uikit"

export default function Header() {
  return (
    <div className="tw-p-5 tw-border-b-2 tw-w-full">
      <h1 className="tw-w-full tw-text-2xl tw-py-3 tw-text-center tw-font-bold tw-mt-5 tw-mb-5 tw-tracking-widest">
        DECENTRALIZED LOTTERY
      </h1>
      <div className="tw-w-full tw-ml-auto tw-py-2 tw-px-4 tw-bg-gray-light tw-flex tw-flex-row tw-justify-center tw-items-center">
        <ConnectButton moralisAuth={false} />
      </div>
    </div>
  )
}
