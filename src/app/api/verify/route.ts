import { TappdClient } from '@phala/dstack-sdk'
import 'dotenv/config'
const storedHashes = require('../hashes.json');
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    const { hashes } = await request.json();
    function areJsonEqual(json1: any, json2: any): boolean {
        return JSON.stringify(json1) === JSON.stringify(json2);
    }
    try {

        // Check if the input hash exists in the storedHashes
        const verifyHash = (hash: any) => {
            if (areJsonEqual(storedHashes, hash)) {
                return {
                    success: true,
                    message: `Hash verified successfully`,
                };
            } else {
                return {
                    success: false,
                    message: `Hash mismatch! Provided hash: ${hash}`,
                };
            }
        };

        const verificationResult = verifyHash(hashes);
        return Response.json({ verificationResult });
    } catch (error) {
        return Response.json({ error: 'Verification failed' });
    }
}