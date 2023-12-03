import { BannerProps } from "@shopify/ui-extensions-react/checkout";

export interface BannerSettingProps {
  status?: BannerProps["status"];
  title?: string;
  description?: string;
  collapsible?: boolean;
  variant?: object;
  accessibility?: string;
}
