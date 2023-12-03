export const getAllProducts = async () => {
    const selected = await shopify.resourcePicker({ type: "product" });
    console.log(selected);
    return selected;
}
