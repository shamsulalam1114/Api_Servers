import { REST, Routes } from "discord.js";
const commands = [
  {
    name: "create",
    description: "Create short url",
  },
];

const rest = new REST({ version: "10" }).setToken(SECRET_KEY);

try {
  console.log("Started refreshing application (/) commands.");

  await rest.put(Routes.applicationCommands("1363498391786487898"), {
    body: commands,
  });

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}
