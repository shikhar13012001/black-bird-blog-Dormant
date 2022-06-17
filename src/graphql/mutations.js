/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserAttributes = /* GraphQL */ `
  mutation CreateUserAttributes(
    $input: CreateUserAttributesInput!
    $condition: ModelUserAttributesConditionInput
  ) {
    createUserAttributes(input: $input, condition: $condition) {
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
export const updateUserAttributes = /* GraphQL */ `
  mutation UpdateUserAttributes(
    $input: UpdateUserAttributesInput!
    $condition: ModelUserAttributesConditionInput
  ) {
    updateUserAttributes(input: $input, condition: $condition) {
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
export const deleteUserAttributes = /* GraphQL */ `
  mutation DeleteUserAttributes(
    $input: DeleteUserAttributesInput!
    $condition: ModelUserAttributesConditionInput
  ) {
    deleteUserAttributes(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
