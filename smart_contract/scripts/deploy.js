async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    // const GatherswapFactory = await ethers.getContractFactory("GatherswapFactory");
    // const factory = await GatherswapFactory.deploy("0x7269085Bba5a114D07A4c56546F11366C7Ba124A");
  
    // console.log("Factory address:", factory.address);

    const GatherswapRouter = await ethers.getContractFactory("GatherswapRouter02");
    const router = await GatherswapRouter.deploy("0xa7dA2c3DE295075ed5fCAFe8473ab901F5B73AE5", "0xc778417E063141139Fce010982780140Aa0cD5Ab");
  
    console.log("Router address:", router.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });