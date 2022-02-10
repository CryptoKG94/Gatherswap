import { checkRouteResult } from './snapshots/snapshot'
import { RToken, ConstantProductRPool } from '../src/PrimaryPools'
import { USDC, WNATIVE } from '@sushiswap/core-sdk'
import { getBigNumber, RouteStatus, findMultiRouteExactIn, findMultiRouteExactOut, closeValues, MultiRoute } from '../src'
import { BigNumber } from '@ethersproject/bignumber'

const gasPrice = 1 * 200 * 1e-9

// Bridge:
//   /1\
// -0 | 3-
//   \2/

function getPool(
  tokens: RToken[],
  t0: number,
  t1: number,
  price: number[],
  reserve: number,
  fee = 0.003,
  imbalance = 0
) {
  return new ConstantProductRPool(
    `pool-${t0}-${t1}-${reserve}-${fee}`,
    { ...tokens[t0] },
    { ...tokens[t1] },
    fee,
    getBigNumber(reserve),
    getBigNumber(Math.round(reserve / (price[t1] / price[t0]) - imbalance))
  )
}

// ====================== Env 1 ==================
const price = [1, 1, 1, 1, 1]
const tokens = price.map((_, i) => ({
  name: '' + (i + 1),
  address: 'token_addres ' + (i + 1),
}))

const testPool0_1 = getPool(tokens, 0, 1, price, 1_500_0)
const testPool0_2 = getPool(tokens, 0, 2, price, 1_000_0)
const testPool1_2 = getPool(tokens, 1, 2, price, 1_000_000_000)
const testPool1_3 = getPool(tokens, 1, 3, price, 1_000_0)
const testPool2_3 = getPool(tokens, 2, 3, price, 1_500_0)

const testPools = [testPool0_1, testPool0_2, testPool1_3, testPool2_3, testPool1_2]

// ======================= Env2 ===================
const price2 = [1, 2, 2.2, 15, 0.01]
const tokens2 = price2.map((_, i) => ({
  name: '' + (i + 1),
  address: 'token_addres ' + (i + 1),
}))

const testPool0_1_2 = getPool(tokens2, 0, 1, price2, 15_000)
const testPool0_2_2 = getPool(tokens2, 0, 2, price2, 100_000)
const testPool1_2_2 = getPool(tokens2, 1, 2, price2, 1_000_000_000)
const testPool1_3_2 = getPool(tokens2, 1, 3, price2, 80_000)
const testPool2_3_2 = getPool(tokens2, 2, 3, price2, 15_000)

const testPools2 = [testPool0_1_2, testPool0_2_2, testPool1_3_2, testPool2_3_2, testPool1_2_2]

function checkExactOut(
  routeIn: MultiRoute,
  routeOut: MultiRoute
) {
  expect(routeOut).toBeDefined()
  expect(closeValues(routeIn.amountIn as number, routeOut.amountIn as number, 5e-2)).toBeTruthy()
  expect(closeValues(routeIn.amountOut as number, routeOut.amountOut as number, 1e-12)).toBeTruthy()
  expect(closeValues(routeIn.priceImpact as number, routeOut.priceImpact as number, 5e-2)).toBeTruthy()
  expect(closeValues(routeIn.primaryPrice as number, routeOut.primaryPrice as number, 5e-2)).toBeTruthy()
  expect(closeValues(routeIn.swapPrice as number, routeOut.swapPrice as number, 5e-2)).toBeTruthy()
}

describe('Multirouting for bridge topology', () => {
  it('works correct for equal prices', () => {
    const res = findMultiRouteExactIn({ ...tokens[0] }, { ...tokens[3] }, 10000, testPools, { ...tokens[2] }, gasPrice, 100)

    expect(res).toBeDefined()
    expect(res?.status).toEqual(RouteStatus.Success)
    expect(res?.legs.length).toEqual(testPools.length)
    expect(res?.legs[res.legs.length - 1].swapPortion).toEqual(1)
    expect(res.priceImpact).toBeGreaterThan(0)

    const res2 = findMultiRouteExactOut(tokens[0], tokens[3], res.amountOut, testPools, tokens[2], gasPrice)
    checkExactOut(res, res2)

    checkRouteResult('bridge-1', res.totalAmountOut)
  })

  it('unknown gas price', () => {
    const res = findMultiRouteExactIn(tokens[0], tokens[3], 20000, testPools, tokens[4], gasPrice, 100)

    expect(res).toBeDefined()
    expect(res?.status).toEqual(RouteStatus.Success)
    expect(res?.legs.length).toEqual(testPools.length)
    expect(res?.legs[res.legs.length - 1].swapPortion).toEqual(1)
    expect(res.priceImpact).toBeGreaterThan(0)

    const res2 = findMultiRouteExactOut(tokens[0], tokens[3], res.amountOut, testPools, tokens[4], gasPrice)
    checkExactOut(res, res2)

    checkRouteResult('bridge-2', res.totalAmountOut)
  })

  it('should work with 20*1e9 as gas price (case form integration)', () => {
    const res = findMultiRouteExactIn(
      USDC[42] as RToken,
      WNATIVE[42] as RToken,
      4 * 1e6,
      [
        new ConstantProductRPool(
          '0x83a19C45358De3611cf297969AEDf8E5Ba7E10FB',
          USDC[42] as RToken,
          WNATIVE[42] as RToken,
          0.003,
          BigNumber.from('879752148'),
          BigNumber.from('227627092068744941')
        ),
      ],
      WNATIVE[42] as RToken,
      20 * 1e9
    )

    expect(res).toBeDefined()
    expect(res?.status).toEqual(RouteStatus.Success)
    expect(res.priceImpact).toBeGreaterThan(0)
  })

  it('not connected tokens', () => {
    const res = findMultiRouteExactIn(tokens[0], tokens[4], 20000, testPools, tokens[2], gasPrice, 100)
    expect(res).toBeDefined()
    expect(res?.status).toEqual(RouteStatus.NoWay)

    const res2 = findMultiRouteExactOut(tokens[0], tokens[4], 10000, testPools, tokens[2], gasPrice)
    expect(res2).toBeDefined()
    expect(res2?.status).toEqual(RouteStatus.NoWay)
  })

  it('partial routing', () => {
    // Try to route too big value => all pools achive min liquidity => no routing any more
    const res = findMultiRouteExactIn(tokens[0], tokens[3], 1000000, testPools, tokens[2], gasPrice, 100)

    expect(res).toBeDefined()
    expect(res?.status).toEqual(RouteStatus.Partial)
    expect(res?.legs.length).toEqual(testPools.length)
    expect(res?.legs[res.legs.length - 1].swapPortion).toEqual(1)
    expect(res.priceImpact).toBeGreaterThan(0)

    const res2 = findMultiRouteExactOut(tokens[0], tokens[3], res.amountOut*2, testPools, tokens[2], gasPrice)
    expect(res2).toBeDefined()
    expect(res2?.status).toEqual(RouteStatus.Partial)

    checkRouteResult('bridge-3', res.totalAmountOut)
  })

  it('Special case for _one_line_ coverage', () => {
    const res = findMultiRouteExactIn(
      tokens[0],
      tokens[3],
      10000,
      testPools,
      tokens[2],
      gasPrice,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12]
    )

    expect(res).toBeDefined()
    expect(res?.status).toEqual(RouteStatus.Success)
    expect(res?.legs[res.legs.length - 1].swapPortion).toEqual(1)
    expect(res.priceImpact).toBeGreaterThan(0)

    const res2 = findMultiRouteExactOut(tokens[0], tokens[3], res.amountOut, testPools, tokens[2], gasPrice,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12])
    checkExactOut(res, res2)

    checkRouteResult('bridge-4', res.totalAmountOut)
  })

  it('Varios step number check', () => {
    const steps = [1, 2, 3, 5, 10, 30, 100, 300, 1000]
    steps.forEach((s) => {
      const res = findMultiRouteExactIn(tokens[0], tokens[3], 10000, testPools, tokens[2], gasPrice, s)
      //console.log(s, res?.amountOut);
      expect(res).toBeDefined()
      expect(res?.status).toEqual(RouteStatus.Success)
      expect(res?.legs[res.legs.length - 1].swapPortion).toEqual(1)
      expect(res.priceImpact).toBeGreaterThan(0)

      const res2 = findMultiRouteExactOut(tokens[0], tokens[3], res.amountOut, testPools, tokens[2], gasPrice, s)
      checkExactOut(res, res2)

      checkRouteResult('bridge-5-' + s, res.totalAmountOut)
    })
  })

  it('works correct for not equal prices', () => {
    const res = findMultiRouteExactIn(tokens2[0], tokens2[3], 10000, testPools2, tokens2[2], gasPrice, 100)

    expect(res).toBeDefined()
    expect(res?.status).toEqual(RouteStatus.Success)
    expect(res?.legs.length).toEqual(testPools.length)
    expect(res?.legs[res.legs.length - 1].swapPortion).toEqual(1)
    expect(res.priceImpact).toBeGreaterThan(0)

    const res2 = findMultiRouteExactOut(tokens2[0], tokens2[3], res.amountOut, testPools2, tokens2[2], gasPrice)
    checkExactOut(res, res2)

    checkRouteResult('bridge-6', res.totalAmountOut)
  })

  it('Varios step number check for not equal prices', () => {
    const steps = [1, 2, 3, 5, 10, 30, 100, 300, 1000]
    steps.forEach((s) => {
      const res = findMultiRouteExactIn(tokens2[0], tokens2[3], 10000, testPools2, tokens2[2], gasPrice, s)
      //console.log(s, res?.amountOut);
      expect(res).toBeDefined()
      expect(res?.status).toEqual(RouteStatus.Success)
      expect(res?.legs[res.legs.length - 1].swapPortion).toEqual(1)
      expect(res.priceImpact).toBeGreaterThan(0)

      const res2 = findMultiRouteExactOut(tokens2[0], tokens2[3], res.amountOut, testPools2, tokens2[2], gasPrice, s)
      checkExactOut(res, res2)

      checkRouteResult('bridge-7-' + s, res.totalAmountOut)
    })
  })

  it('very small swap', () => {
    const token0 = { name: 'Token0', address: 'Token0Address' }
    const token1 = { name: 'Token1', address: 'Token1Address' }
    const pool = getPool([token0, token1], 0, 1, [1, 2], 1e18, 0.03, 0)
    const res = findMultiRouteExactIn(token0, token1, 100, [pool], token1, 200)
    expect(res.amountOut).toBeGreaterThan(0)
    expect(res.priceImpact).toBeGreaterThan(0)

    const res2 = findMultiRouteExactOut(token0, token1, res.amountOut, [pool], token1, 200)
    checkExactOut(res, res2)
  })
})
