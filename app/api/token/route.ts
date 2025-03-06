import {NextResponse} from 'next/server';
import {SignJWT, importPKCS8} from 'jose';

const YourPrivateKey = process.env.PRIVATE_KEY;
const kid = process.env.KID;
const sub = process.env.SUB;

async function generateJWT() {
    try {
        const privateKey = await importPKCS8(YourPrivateKey ?? '', 'EdDSA');
        const customHeader = {
            alg: 'EdDSA',
            kid: kid,
        };
        const iat = Math.floor(Date.now() / 1000) - 30;
        const exp = iat + 900;
        const customPayload = {
            sub: sub,
            iat: iat,
            exp: exp,
        };
        const token = await new SignJWT(customPayload)
            .setProtectedHeader(customHeader)
            .sign(privateKey);
        return token;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to generate JWT');
    }
}

export async function POST() {
    try {
        const token = await generateJWT();
        return NextResponse.json({token});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: 'Failed to generate JWT'}, {status: 500});
    }
}
