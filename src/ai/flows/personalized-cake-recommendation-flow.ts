'use server';
/**
 * @fileOverview A Genkit flow for the AI Flavor Sommelier, recommending cake flavors
 * or dessert pairings based on user occasion or mood.
 *
 * - personalizeCakeRecommendation - A function that handles the cake recommendation process.
 * - PersonalizeCakeRecommendationInput - The input type for the personalizeCakeRecommendation function.
 * - PersonalizeCakeRecommendationOutput - The return type for the personalizeCakeRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeCakeRecommendationInputSchema = z.object({
  occasionOrMood: z
    .string()
    .describe('The user\u0027s special occasion or current mood.'),
});
export type PersonalizeCakeRecommendationInput = z.infer<
  typeof PersonalizeCakeRecommendationInputSchema
>;

const PersonalizeCakeRecommendationOutputSchema = z.object({
  cakeFlavor: z.string().describe('The recommended CakeStory flavor.'),
  pairingDescription: z
    .string()
    .describe('A description of why this cake is recommended and any suggested dessert pairing.'),
});
export type PersonalizeCakeRecommendationOutput = z.infer<
  typeof PersonalizeCakeRecommendationOutputSchema
>;

export async function personalizeCakeRecommendation(
  input: PersonalizeCakeRecommendationInput
): Promise<PersonalizeCakeRecommendationOutput> {
  return personalizedCakeRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCakeRecommendationPrompt',
  input: {schema: PersonalizeCakeRecommendationInputSchema},
  output: {schema: PersonalizeCakeRecommendationOutputSchema},
  prompt: `You are the CakeStory AI Flavor Sommelier, an expert in luxury desserts.
Your task is to recommend the perfect cake flavor from CakeStory's premium selection or suggest a dessert pairing, based on the user's occasion or mood.

Available CakeStory flavors and their moods:
1. Vanilla Dream: Elegant, minimal, soft luxury.
2. Strawberry Bliss: Bright, playful, premium.
3. Chocolate Decadence: Dark, cinematic, luxurious.
4. Black Forest Royale: Premium, dramatic, editorial.

User's occasion or mood: {{{occasionOrMood}}}

Consider the mood and characteristics of the available cakes to provide a tailored recommendation. Explain your choice elegantly.
`,
});

const personalizedCakeRecommendationFlow = ai.defineFlow(
  {
    name: 'personalizedCakeRecommendationFlow',
    inputSchema: PersonalizeCakeRecommendationInputSchema,
    outputSchema: PersonalizeCakeRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
