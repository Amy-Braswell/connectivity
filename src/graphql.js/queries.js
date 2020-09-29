import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      name
      userId
      picture
      likeCount
      likes {
        name
      }
      commentCount
      comments {
        id
        name
        picture
        createdAt
        body
      }
    }
  }
`;

export const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      name
      userId
      picture
      likeCount
      likes {
        name
      }
      commentCount
      comments {
        id
        name
        picture
        createdAt
        body
      }
    }
  }
`;

export const FETCH_USERS_QUERY = gql`
  {
    getUsers {
    id
    name
    phone
    about
    city
    state
    relation
    email
    picture
    banner
    token
    createdAt
    }
  }
`;

export const FETCH_USER_QUERY = gql`
  query($userId: ID!) {
    getUser(userId: $userId) {
    id
    name
    phone
    about
    city
    state
    relation
    banner
    email
    picture
    createdAt
    }
  }
`;

export const FETCH_PHOTOS_QUERY = gql`
  {
    getPhotos {
      id
      image
      createdAt
      folder{
        name
        createdAt
      }
    }
  }
`;

export const FETCH_PHOTO_QUERY = gql`
  query($photoId: ID!) {
    getPhoto(photoId: $photoId) {
      id
      image
      createdAt
      folder{
        name
        createdAt
      }
    }
  }
`;



