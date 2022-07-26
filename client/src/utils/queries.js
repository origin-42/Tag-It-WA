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
                comments {
                    _id
                }
            }
            comments {
                _id
                description
                user {
                    _id
                }
                tag {
                    _id
                }
                repliedUser {
                    _id
                }
                date
            }
        }
    }
`;

export const QUERY_ONE_USER = gql`
    query getAUser($_id: ID!) {
        getAUser(_id: $_id) {
            _id
            username
        }
    }
`;

export const QUERY_CRITERIA = gql`
    query getCriteria($criteria: String!) {
        getCriteria(criteria: $criteria) {
            _id
            lat
            lng
            criteria
            date
            description
            active
            resolved
            confirmed
            denied
            comments {
                _id
                description
                user {
                    _id
                    username
                }
                repliedUser {
                    _id
                    username
                }
            }
            user {
                _id
                username
            }
        }
    }
`;

export const QUERY_TAG = gql`
    query tag($_id: ID) {
        tag(_id: $_id) {
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
            user {
                _id
                username
            }
            comments {
                _id
                description
                user {
                    _id
                    username
                }
                date
            }
        }
    }
`;

export const QUERY_ALL_TAGS = gql`
    {
        getAllTags {
            _id
            tags {
                _id
                date
                lat
                lng
                criteria
                description
                user {
                    _id
                    username
                }
            }
        }
    }
`;
