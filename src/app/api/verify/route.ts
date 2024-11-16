import { TappdClient } from '@phala/dstack-sdk'
import 'dotenv/config'
const storedHashes = require('../hashes.json');
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    const { hashes } = await request.json();
    try {
        const endpoint = process.env.DSTACK_SIMULATOR_ENDPOINT || 'http://localhost:8090'

        const client = new TappdClient(endpoint)
        // Step 1: Derive a key specific to the frontend build hash
        const keyResponse = await client.deriveKey('/frontend/keys', hashes);

        // Step 2: Generate a TDX quote with the derived key's hash as report data
        const reportData = keyResponse.key; // Using the derived key as report data
        const quoteResponse = await client.tdxQuote(reportData);

        return Response.json({
            verificationResult: true,
            derivedKey: keyResponse.key,
            certificateChain: keyResponse.certificate_chain,
            quote: quoteResponse.quote,
            eventLog: quoteResponse.event_log,
        });
    } catch (error) {
        return Response.json({ error: 'Verification failed' });
    }
}