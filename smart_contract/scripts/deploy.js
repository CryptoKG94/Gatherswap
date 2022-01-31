async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const GatherswapFactory = await ethers.getContractFactory("GatherswapFactory");
    const factory = await GatherswapFactory.deploy("0xf370C0f60c3022E2116846893c029b2E1302A513");
  
    console.log("Factory address:", factory.address);

    const GatherswapRouter = await ethers.getContractFactory("GatherswapRouter02");
    const router = await GatherswapRouter.deploy("0x4eD689DcA757299A1b03050072650eaA3aEa864B", "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2");
  
    console.log("Router address:", router.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });