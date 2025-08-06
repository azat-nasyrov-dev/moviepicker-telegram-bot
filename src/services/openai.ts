import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const client = new OpenAI();

const Recommendations = z.object({
  entities: z.array(
    z.object({
      title: z.string(),
      reasoning: z.string(),
    }),
  ),
  response: z.string(),
});

export async function getRecommendations(query: string) {
  const completion = await client.beta.chat.completions.parse({
    model: "gpt-4o",
    messages: [
      {
        role: "developer",
        content: `
                    You are a film critic who recommends movies and TV shows to users based on their 
                    queries and wishes. Return an array of movie and TV show recommendations, indicating the 
                    reason why you think it is relevant. Return no more than 5 recommendations. 
                    If the user's query is not related to movies and TV shows and your expertise, let 
                    the user know about it.`,
      },
      {
        role: "user",
        content: query,
      },
    ],
    response_format: zodResponseFormat(Recommendations, "response"),
  });

  const recommendations = completion.choices[0].message.parsed;

  console.log("openai response:", recommendations);

  return recommendations;
}
