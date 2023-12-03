export const productByType = `query ($first: Int!) {
    products(first: $first, query: "product_type:serum") {
      nodes {
        id
        title              
        images(first:1){
          nodes {
            url
          }
        }
        variants(first: 1) {
          nodes {
            id
            price {
              amount
            }
          }
        }
      }
    }
  }`;
