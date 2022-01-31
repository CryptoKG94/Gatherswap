# Gatherswap Area

Code from [Gatherswap](https://github.com/hiccup/GatherSwap) with the following modifications.

1. Change contract version to 0.6.12 and do the necessary patching.
2. Add `migrator` member in `GatherswapFactory` which can be set by `feeToSetter`.
3. Allow `migrator` to specify the amount of `liquidity` during the first mint. Disallow first mint if migrator is set.

To see all diffs:

```
$ git diff 4c4bf551417e3df09a25aa0dbb6941cccbbac11a .
```