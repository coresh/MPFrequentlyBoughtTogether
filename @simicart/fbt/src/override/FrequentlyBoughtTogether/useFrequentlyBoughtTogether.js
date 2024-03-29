import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'

export const GET_FBT_PRODUCTS = gql`
    query getfbtProduct($url_key: String!) {
        products(filter: {url_key: {eq: $url_key}}) {
          items {
            id
            name
            sku
          fbt_products{
            name
            id
            url_key
            url_suffix
            }
          }
        }
      }
`;

export const useFrequentlyBoughtTogether = (props) => {
    const { url_key } = props;
    const { error: fbtError,
        loading: fbtLoading,
        data: fbtData
    } = useQuery(GET_FBT_PRODUCTS, {
        variables: {
            url_key: "silver-sol-earrings"
        },
        fetchPolicy: 'no-cache'
    });

    let derivedErrorMessage;

    if (fbtError) {
        const errorTarget = fbtError;
        if (errorTarget.graphQLErrors) {
            // Apollo prepends "GraphQL Error:" onto the message,
            // which we don't want to show to an end user.
            // Build up the error message manually without the prepended text.
            derivedErrorMessage = errorTarget.graphQLErrors
                .map(({ message }) => message)
                .join(', ');
        } else {
            // A non-GraphQL error occurred.
            derivedErrorMessage = errorTarget.message;
        }
    }
    return {
        fbtData,
        fbtLoading,
        derivedErrorMessage
    }
}
