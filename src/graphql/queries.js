/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserAttributes = /* GraphQL */ `
  query GetUserAttributes($id: ID!) {
    getUserAttributes(id: $id) {
      id
      profileImage
      userId
      username
      follow
      createdAt
      updatedAt
    }
  }
`;
export const listUserAttributes = /* GraphQL */ `
  query ListUserAttributes(
    $filter: ModelUserAttributesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserAttributes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        profileImage
        userId
        username
        follow
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userDetailById = /* GraphQL */ `
  query UserDetailById(
    $userId: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserAttributesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    UserDetailById(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        profileImage
        userId
        username
        follow
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userDetailByUsername = /* GraphQL */ `
  query UserDetailByUsername(
    $username: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserAttributesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    UserDetailByUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        profileImage
        userId
        username
        follow
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      content
      description
      username
      coverImage
      postTags
      likes
      reactions {
        emoji
        by
      }
      comments {
        items {
          id
          postId
          content
          username
          createdAt
          updatedAt
        }
        nextToken
      }
      userImage
      Category
      createdAt
      email
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        description
        username
        coverImage
        postTags
        likes
        reactions {
          emoji
          by
        }
        comments {
          nextToken
        }
        userImage
        Category
        createdAt
        email
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsBytitle = /* GraphQL */ `
  query PostsBytitle(
    $title: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsBytitle(
      title: $title
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        content
        description
        username
        coverImage
        postTags
        likes
        reactions {
          emoji
          by
        }
        comments {
          nextToken
        }
        userImage
        Category
        createdAt
        email
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByUsername = /* GraphQL */ `
  query PostsByUsername(
    $username: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByUsername(
      username: $username
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        content
        description
        username
        coverImage
        postTags
        likes
        reactions {
          emoji
          by
        }
        comments {
          nextToken
        }
        userImage
        Category
        createdAt
        email
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchPosts = /* GraphQL */ `
  query SearchPosts(
    $filter: SearchablePostFilterInput
    $sort: [SearchablePostSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchablePostAggregationInput]
  ) {
    searchPosts(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        title
        content
        description
        username
        coverImage
        postTags
        likes
        reactions {
          emoji
          by
        }
        comments {
          nextToken
        }
        userImage
        Category
        createdAt
        email
        updatedAt
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      postId
      content
      username
      commentReactions {
        emoji
        by
      }
      createdAt
      updatedAt
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postId
        content
        username
        commentReactions {
          emoji
          by
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
