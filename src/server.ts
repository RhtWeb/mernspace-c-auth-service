function welcome(name: string) {
  const user = {
    firstname: "Rohit",
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const fname = user[firstname];

  console.log("welcome" + name + fname);
}

welcome("Rohit");
