import { BannerSettingProps } from "../../../types";
import {
  reactExtension,
  Banner,
  useSettings,
  useCartLines,
  TextBlock,
  BlockStack,
  View,
} from "@shopify/ui-extensions-react/checkout";

/* DEV NOTE - These 3 extension targets allow for the dynamic banner to be added to multiple steps / places throughout checkout. Each step can contain multiple banners if needed. Additional settings can be configured as well. */

// Set the entry points for the extension
/* This extension point allows for the banner to render on: Information Step, Shipping Step, and Payment Step as a dynamic block */
const checkoutBlock = reactExtension("purchase.checkout.block.render", () => (
  <App />
));
export { checkoutBlock };

/* This extension point allows for the banner to render on: Post Purchase Thank you page ONLY. */
const checkoutThankYou = reactExtension(
  "purchase.thank-you.block.render",
  () => <App />
);
export { checkoutThankYou };

/* This extension point allows for the banner to render on: Post Purchase Order Status Page ONLY. */
const checkoutOrderStatus = reactExtension(
  "customer-account.order-status.block.render",
  () => <App />
);
export { checkoutOrderStatus };

/* DEV NOTE: Not sure why the sample included this extra extension target, as the one above is dynamic through all steps of checkout. But leaving it here with it commented out and in the extension toml file just in case we need to re-add it or need it for reference.

const deliveryAddress = reactExtension("purchase.checkout.delivery-address.render-before", () => <App />);
export { deliveryAddress };
*/

function App() {
  const {
    title,
    description,
    collapsible,
    status,
    accessibility,
  }: BannerSettingProps = useSettings();

  // Set a default status for the banner if a merchant didn't configure the banner in the checkout editor

  const selectedVariant = useSettings().variant;

  // Get the cart lines from the useCartLines hook
  const cartLines = useCartLines();

  // If the variant setting is not set, render the banner
  if (!selectedVariant) {
    return (
      <View>
        <Banner status={status} collapsible={collapsible} title={title}>
          <BlockStack
            spacing="base"
            inlineAlignment="start"
            accessibilityRole="complementary"
            accessibilityLabel={accessibility}
          >
            <View>
              <TextBlock size="medium"> {description}</TextBlock>
            </View>
          </BlockStack>
        </Banner>
      </View>
    );
  }

  // If the variant setting is set, check if the matching variant is in the user's cart
  const isInCart = cartLines.some(
    (cartLine) => cartLine.merchandise.id === selectedVariant
  );

  // Only render the banner if the variant setting is set and the matching variant is in the user's cart, or if there is no variant settings
  return selectedVariant && isInCart ? (
    <View>
      <Banner status={status} collapsible={collapsible} title={title}>
        <BlockStack
          spacing="base"
          inlineAlignment="start"
          accessibilityRole="complementary"
          accessibilityLabel={accessibility}
        >
          <View>
            <TextBlock size="medium"> {description}</TextBlock>
          </View>
        </BlockStack>
      </Banner>
    </View>
  ) : null;
}
