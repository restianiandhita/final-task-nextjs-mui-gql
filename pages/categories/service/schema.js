import { gql } from '@apollo/client';


export const DEFAULT_ATRIBUTE_CATEGORIES_FR = gql`
fragment defaultAtributeCategoriesFr on CategoryTree {
  id
  name
  image
  description
}`;

export const GET_CATEGORIES = gql`
query getCategories ($categoryKey: String) {
  mainCategories: categories(filters: {
    url_key:{
      eq:$categoryKey
    }
  }) {
    items{
      ...defaultAtributeCategoriesFr
      children{
        ...defaultAtributeCategoriesFr
        url_key
        products{
          total_count
        }
        include_in_menu
        popular_icon
      }
      __typename
    }
    total_count
    __typename
  }
}
${DEFAULT_ATRIBUTE_CATEGORIES_FR}`;

export const GET_PRODUCT_BY_CATEGORY = gql`
query getCategoryProducts($categoryId: Int) {
    product: category(id: $categoryId){
      id
      name
      url_key
      products{
        items{
          id
          name
          image{
            url
          }
          popular_icon
          rating_summary
          review_count
          url_key
          price_range{
            minimum_price{
              final_price{
                value
              }
              regular_price{
                value
              }
            }
          }
        }
        total_count
      }
    }
  }
`
export const GET_PRODUCT = gql`
query getProduct($urlKey: String) {
    products(filter: {
      url_key: {
        eq: $urlKey
      }
    }){
      items{
        id
        name
        description {
          html
        }
        image{
          url
        }
        price_range{
          maximum_price{
            final_price{
              value
            }
            regular_price{
              value
            }
          }
        }
        qty_available
        rating_summary
        categories{
          name
        }
      }
    }
  }
`