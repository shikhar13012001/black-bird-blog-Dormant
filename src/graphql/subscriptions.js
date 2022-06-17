/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($username: String) {
    onCreateComment(username: $username) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($username: String) {
    onUpdateComment(username: $username) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($username: String) {
    onDeleteComment(username: $username) {
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
