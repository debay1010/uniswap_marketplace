async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const customDex = await ethers.deployContract("CustomDex");

  //   console.log("CCustomDex:", await customDex.getAddress());
  console.log("CCustomDex:", await customDex.address());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
