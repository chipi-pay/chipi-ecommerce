import Link from "next/link";
import { Button } from "./ui/button";

export function PayWithExternalWalletButton({ usdAmount }: { usdAmount: number}) {
    const merchantWallet = process.env.NEXT_PUBLIC_MERCHANT_WALLET;
    const redirectUrl = process.env.NEXT_PUBLIC_URL + "/checkout";
    const encodedRedirectUrl = encodeURIComponent(redirectUrl);
    const href = `https://pay.chipipay.com/?usdAmount=${usdAmount}&token=USDC&starknetWallet=${merchantWallet}&redirectUrlEncoded=${encodedRedirectUrl}`;
    
    return (
        <Button asChild className="w-full transform   bg-purple-500  text-center  font-semibold text-white  transition-all duration-200 ease-in-out  hover:bg-purple-600 active:bg-purple-700">
            <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
            >
                <img
                    src="/starknet-logo.svg"
                    alt="Starknet Logo"
                    className="h-6 w-6"
                />
                Pay with Starknet
            </Link>
        </Button>
    );
}   