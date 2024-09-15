import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "meta-llama-3.1-405b-instruct";

export async function llama(filename, fileContent) {
  const client = new ModelClient(endpoint, new AzureKeyCredential(token));

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `Please review the following file and provide suggestions for improvement. Advice should be no more than 5 lines and 100 characters. p: Starts with a rating of the strength of the review from 1 to 5, where 1 is strong and 5 is weak. \n\nFile Name:Please review the following file and provide suggestions for improvement.\n\nFile Name:  ${filename}\n\nFile Content:\n\n${fileContent}`,
        },
      ],
      model: modelName,
      temperature: 0,
      max_tokens: 1000,
      top_p: 1.0,
    },
  });

  if (response.status !== "200") {
    throw response.body.error;
  }
  return response.body.choices[0].message.content;
}

llama().catch((err) => {
  console.error("The sample encountered an error:", err);
});
