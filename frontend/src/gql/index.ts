import { gql } from "@apollo/client";

export const GET_NOTICE = gql`
  query GetNoticeById($noticeId: String!) {
    getPostById(id: $noticeId) {
      postId
      title
      content
      status
      authorId
      author {
        id
        userName
      }
      updatedAt
      createdAt
    }
  }
`;

export const CREATE_NOTICE = gql`
  mutation Mutation($notice: CreatePostInput!) {
    createPost(post: $notice) {
      postId
      title
      content
      status
      authorId
      updatedAt
      createdAt
    }
  }
`;

export const UPDATE_NOTICE = gql`
  mutation Mutation($notice: UpdatePostInput!) {
    updatePost(post: $notice) {
      postId
      title
      content
      status
      authorId
      updatedAt
      createdAt
    }
  }
`;

export const DELETE_NOTICE = gql`
  mutation Mutation($notice: DeletePostInput!) {
    deletePost(id: $notice) {
      postId
      title
      content
      status
      authorId
      updatedAt
      createdAt
    }
  }
`;

export const GET_POST = gql`
  query GetPostById($postId: String!) {
    getPostById(id: $postId) {
      postId
      title
      content
      status
      authorId
      author {
        id
        userName
      }
      updatedAt
      createdAt
    }
  }
`;

export const CREATE_POST = gql`
  mutation Mutation($post: CreatePostInput!) {
    createPost(post: $post) {
      postId
      title
      content
      status
      authorId
      updatedAt
      createdAt
    }
  }
`;

export const UPDATE_POST = gql`
  mutation Mutation($post: UpdatePostInput!) {
    updatePost(post: $post) {
      postId
      title
      content
      status
      authorId
      updatedAt
      createdAt
    }
  }
`;

export const DELETE_POST = gql`
  mutation Mutation($post: DeletePostInput!) {
    deletePost(id: $post) {
      postId
      title
      content
      status
      authorId
      updatedAt
      createdAt
    }
  }
`;

export const GET_NOTICES = gql`
  query GET_POSTS($pagination: OffsetPagination!, $orderBy: PostsOrder) {
    posts(pagination: $pagination, orderBy: $orderBy) {
      list {
        postId
        title
        content
        status
        authorId
        author {
          id
          userName
        }
        updatedAt
        createdAt
      }
      totalCount
    }
  }
`;

export const GET_POSTS = gql`
  query Posts($pagination: OffsetPagination!, $orderBy: PostsOrder) {
    posts(pagination: $pagination, orderBy: $orderBy) {
      list {
        postId
        title
        content
        status
        authorId
        author {
          id
          userName
        }
        updatedAt
        createdAt
      }
      totalCount
    }
  }
`;

export const GET_USER = gql`
  query GET_USER($userId: String!) {
    getUserById(id: $userId) {
      userId
      userName
      role
      createAt
    }
  }
`;
