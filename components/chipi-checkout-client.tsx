'use client';

import { useCart } from './cart/cart-context';
import Price from './price';

import { PayWithExternalWalletButton } from './pay-with-external-wallet';

import {
    Button,
} from './ui/button';

import {
    Separator,
} from './ui/separator';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from './ui/card';
import { redirectToCheckout } from './cart/actions';

export interface ChipiCheckoutClientProps {
    hasTransactionHash: boolean;

}

export default function ChipiCheckoutClient({ hasTransactionHash }: { hasTransactionHash: boolean }) {
    const { cart } = useCart();

    if (!cart || cart.lines.length === 0) {
        return (
            <div className="bg-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
                    <p className="text-gray-600">Add some items to your cart before checking out.</p>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            redirectToCheckout();
        } catch (error) {
            console.error('Payment failed:', error);
            alert('Payment failed. Please try again.');
        }
    };

    return (
        <div>
            <div aria-hidden="true" className="fixed top-0 left-0 hidden h-full w-1/2 bg-zinc-950 lg:block" />
            <div aria-hidden="true" className="fixed top-0 right-0 hidden h-full w-1/2 bg-black lg:block" />

            <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 lg:pt-16">
                <section className="bg-black py-12 text-indigo-300 md:px-10 lg:col-start-2 lg:row-start-1 lg:max-w-lg lg:px-0 lg:pb-24">
                    <Card className="bg-transparent border-none shadow-none text-white">
                        <CardHeader>
                            <CardTitle className="text-white">Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <dl>
                                <dt className="text-sm font-medium">Amount due</dt>
                                <dd className="mt-1 text-3xl font-bold tracking-tight text-white">
                                    <Price amount={cart.cost.totalAmount.amount} currencyCode={cart.cost.totalAmount.currencyCode} />
                                </dd>
                            </dl>

                            <ul className="divide-y divide-white/10 text-sm font-medium mt-6">
                                {cart.lines.map((item) => (
                                    <li key={item.id} className="flex items-start space-x-4 py-6">
                                        <img
                                            alt={item.merchandise.product.featuredImage.altText || item.merchandise.product.title}
                                            src={item.merchandise.product.featuredImage.url}
                                            className="size-20 rounded-md object-cover"
                                        />
                                        <div className="flex-auto space-y-1">
                                            <h3>{item.merchandise.product.title}</h3>
                                            {item.merchandise.title !== 'Default Title' && (
                                                <p className="text-indigo-200">{item.merchandise.title}</p>
                                            )}
                                            {item.merchandise.selectedOptions.map((option) => (
                                                <p key={option.name} className="text-indigo-200">
                                                    {option.name}: {option.value}
                                                </p>
                                            ))}
                                            <p className="text-indigo-200">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="flex-none text-base font-medium">
                                            <Price amount={item.cost.totalAmount.amount} currencyCode={item.cost.totalAmount.currencyCode} />
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <Separator className="my-6 bg-white/20" />

                            <dl className="space-y-4 text-sm font-medium">
                                <div className="flex justify-between">
                                    <dt>Subtotal</dt>
                                    <dd>
                                        <Price amount={cart.cost.subtotalAmount.amount} currencyCode={cart.cost.subtotalAmount.currencyCode} />
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt>Shipping</dt>
                                    <dd>Calculated at checkout</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt>Taxes</dt>
                                    <dd>
                                        <Price amount={cart.cost.totalTaxAmount.amount} currencyCode={cart.cost.totalTaxAmount.currencyCode} />
                                    </dd>
                                </div>
                                <Separator className="bg-white/20" />
                                <div className="flex justify-between text-base">
                                    <dt>Total</dt>
                                    <dd>
                                        <Price amount={cart.cost.totalAmount.amount} currencyCode={cart.cost.totalAmount.currencyCode} />
                                    </dd>
                                </div>
                            </dl>
                        </CardContent>
                    </Card>
                </section>

                <section className="py-16 lg:col-start-1 lg:row-start-1 lg:max-w-lg lg:pb-24">
                    <form onSubmit={handleSubmit} className="space-y-10">
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Card className="border">
                                    <CardHeader>
                                        <CardTitle className="text-sm">External Wallet</CardTitle>
                                        <CardDescription>Pay securely with USDC</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <PayWithExternalWalletButton usdAmount={parseFloat(cart.cost.totalAmount.amount) + 0.01} />
                                    </CardContent>
                                </Card>

                                <div className="flex items-center my-4">
                                    <Separator className="flex-1" />
                                    <span className="mx-4 text-sm text-muted-foreground">Or pay with card</span>
                                    <Separator className="flex-1" />

                                </div>
                                <Card className="border">
                                    <CardHeader>
                                        <CardTitle className="text-sm">Standard Checkout</CardTitle>
                                        <CardDescription>Pay with card or PayPal</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <Button className="w-full bg-blue-600 hover:bg-indigo-700 text-white" onClick={() => redirectToCheckout()}> Shopify Checkout</Button>
                                    </CardContent>
                                </Card>
                            </CardContent>
                        </Card>
                        {
                            hasTransactionHash && (
                                <Button type="submit">
                                    Continue to Shipping
                                </Button>
                            )
                        }
                    </form>
                </section>
            </div>
        </div>
    );
}