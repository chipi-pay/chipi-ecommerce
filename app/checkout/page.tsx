import { Metadata } from 'next';
import ChipiCheckoutClient from '@/components/chipi-checkout-client';
import { updateCartNoteAction } from '@/components/cart/actions';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your purchase',
};

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ transactionHash?: string }> }) {
  const params = await searchParams;
  const txhash = params.transactionHash;
  if (txhash) {
      await updateCartNoteAction(`Barcode=${txhash}`);
  }

  return <ChipiCheckoutClient hasTransactionHash={!!txhash}  />;
}
