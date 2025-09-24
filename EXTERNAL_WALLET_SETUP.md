# External Wallet Payment Setup

## Environment Variables

Add the following environment variable to your `.env.local` file:

```bash
NEXT_PUBLIC_MERCHANT_WALLET=your-starknet-wallet-address
```

## How It Works

The external wallet payment integration:

1. **Displays Payment Option**: Shows a "Pay with External Wallet" button in the checkout form
2. **Redirects to ChipiPay**: Opens a new tab/window to `https://pay.chipipay.com/` with:
   - `usdAmount`: The total amount from the cart
   - `token`: Set to "USDC" 
   - `starknetWallet`: Your merchant wallet address

## Features

- ✅ **Dynamic Amount**: Automatically calculates the total from the cart
- ✅ **Secure Redirect**: Opens in a new tab to prevent cart loss
- ✅ **Fallback Option**: Users can still pay with traditional card payment
- ✅ **Responsive Design**: Works on all device sizes

## Usage

1. Add items to cart
2. Go to checkout (`/checkout`)
3. Choose between:
   - **External Wallet**: Click "Pay with External Wallet" button
   - **Card Payment**: Fill out the card form below

## Customization

To modify the external wallet integration, edit:
- `components/pay-with-external-wallet.tsx` - Button component
- `components/checkout.tsx` - Integration in checkout form
