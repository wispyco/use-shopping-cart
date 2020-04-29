declare module 'use-shopping-cart' {

    export interface ProviderProps {
        children: JSX.Element,
        stripe: stripe.Stripe,
        successUrl: string,
        cancelUrl: string,
        currency: string,
        language: string,
        billingAddressCollection: boolean,
        allowedCountries: null | string[]
    }

    /**
	 * Context provider to interact with Stripe API
	 * @param children The Entry point to your app
	 * @param stripe The stripe object
	 * @param successUrl The redirect url for a successful sale
	 * @param cancelUrl The redirect url for a cancelled sale
	 * @param currency The preferred currency
	 * @param language The language to be used in the checkout
	 * @param billingAddressCollection Should the billing address be collected at the checkout. Defaults to false
     * @param allowedCountries The allowed countries
	 */
    export const CartProvider: (props: ProviderProps) => JSX.Element;

    export interface Product {
        /** 
         * The name of the product
         */
        name?: string;
        /**
         * The product sku
         */
        sku: string;
        /**
         * The price of the product
         */
        price: number;
        /**
         * An image of the product
         */
        image?: string;
        /**
         * The currency of the product
         */
        currency?: string;
        /**
         * Any additional properties
         */
        [propName: string]: any;
    }

    export type CartDetails = {
        [sku: string]: Product
    };

    export interface ShoppingCartUtilities {
        /**
         * Add an item to the cart
         * @param product The product to add to the cart
         */
        addItem: (product: Product) => void, 
        /**
         * Remove a cart item
         * @param sku The item to remove sku
         */
        removeCartItem: (sku: string) => void,
        /**
         * Reduce the quantity of items by one in the cart
         * @param sku The sku of the item to reduce quantity by one
         */
        reduceItemByOne: (sku: string) => void,
        /**
         * Calculates the total price of the cart items
         */
        totalPrice: () => string;
        /**
         * The number of items in the cart
         */
        cartCount: number;
        /**
         * Cart details is an object with skus of the items in the cart as keys and details of the items as the value,
         */
        cartDetails: CartDetails;
        /**
         * Redirects customers to the Stripe checkout
         * @returns result object || error message
         */
        redirectToCheckout: (sessionId?: string) => Promise<undefined | Error>;
        /**
         * Totally clears the cart of all items
         */
        clearCart: () => void;
    }

    /**
     * Provides several utilities and pieces of data for you to use in your application.
     * @returns addItem - Add an item to the cart
     * @returns removeCartItem - Remove a cart item
     * @returns reduceItemByOne - Reduce the quantity of items by one in the cart
     * @returns totalPrice - Calculates the total price of the cart items
     * @returns cartCount - The number of items in the cart
     * @returns cartDetails - An object of skus
     * @returns redirectToCheckout - Redirects customers to the Stripe checkout
     * @returns clearCart - Totally clears the cart of all items
     */
    export declare function useShoppingCart (): ShoppingCartUtilities;

    interface ToCurrencyProps {
        /**
         * The value to convert
         */
        value: number;
        /**
         * The currency format. For example US
         */
        currency: string;
        /**
         * The language
         */
        language: string;
    }

    /**
     * Formats the the currency to a string value
     * @param value The value to convert
     * @param currency The currency format. For example US
     * @param language The language
     */
    export declare function toCurrency(props: ToCurrencyProps): string;
}