import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const RecycleChainModule = buildModule('RecycleChainModule', (m) => {
  const recycleChain = m.contract('RecycleChain', [])

  return { recycleChain }
})

export default RecycleChainModule
