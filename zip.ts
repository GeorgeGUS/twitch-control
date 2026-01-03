import { zip } from "zip-a-folder";

const outputPath = "twitch-control.zip";
const sourcePath = "dist";

zip(sourcePath, outputPath)
  .then(() => {
    console.log(`Successfully created ${outputPath} from ${sourcePath}`);
  })
  .catch((error) => {
    console.error("Error while zipping folder:", error);
  });
