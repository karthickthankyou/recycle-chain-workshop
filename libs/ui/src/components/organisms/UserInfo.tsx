import { useAccount } from '@recycle-chain/util/src/hooks/ether'
import { BaseComponent } from '@recycle-chain/util/src/types'
import Image from 'next/image'

export const UserInfo = ({ className, children }: BaseComponent) => {
  const { account, balance, isOwner } = useAccount()

  return (
    <div className={className}>
      <div className=" flex gap-3 ">
        <Image
          src="/user-pattern.jpg"
          width={300}
          height={300}
          alt=""
          className="rounded-full w-16 h-16"
        />
        <div>
          <div className="mb-2 pr-6">
            <span className="text-gray-600 break-all">{account}</span>
            {isOwner ? (
              <span className=" ml-2 border border-black shadow-lg px-2 mt-1 py-1 rounded-full">
                Contract Owner
              </span>
            ) : null}
          </div>
        </div>
      </div>
      <div className="mt-2 bg-gray-25 p-2 text-right rounded">
        <div className="font-semibold">Balance</div>
        <p className="text-gray-600 font-light text-2xl">
          {Number(balance).toFixed(4)} MATIC
        </p>
      </div>
    </div>
  )
}
