import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    {
        user {
            username
            tags {
                _id
                lat
                lng
                date
                criteria
                description
                active
                resolved
                notifyUser
                confirmed
                denied
            }
            comments {
                _id
                description
            }
        }
    }
`;