import gql from 'graphql-tag';



export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    email
    name
    about
    city
    state
    picture
    banner
    phone
    relation
    createdAt
    token
  }
}
`

export const REGISTER_USER = gql`
mutation register(
  $name: String!
  $email: String!
  $password: String!
  $confirmPassword: String!
) {
  register(
    registerInput: {
      name: $name
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    }
  ) {
    id
    email
    name
    createdAt
    token
  }
}
`;

export const UPDATE_USER = gql`
mutation updateProfile(
  $email: String!
  $phone: String
  $city: String
  $state: String
  $about: String
  $relation: String
  $picture: String
  $banner: String
) {
  updateProfile(
    updateInput: {
      email: $email
      phone: $phone
      city: $city
      state: $state
      about: $about
      relation: $relation
      picture: $picture
      banner: $banner
    }
  ) {
    email
    phone
    city
    state
    about
    relation
    picture
    banner 
  }
}
`;

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      name
      userId
      picture
      likes {
        id
        name
        createdAt
      }
      likeCount
      comments {
        id
        body
        picture
        name
        createdAt
      }
      commentCount
    }
  }
`

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

export const LIKE_POST_MUTATION = gql`
mutation likePost($postId: ID!) {
  likePost(postId: $postId) {
    id
    likes {
      id
      name
    }
    likeCount
  }
}
`

export const SUBMIT_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        picture
        createdAt
        name
      }
      commentCount
    }
  }
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        name
        createdAt
        picture
        body
      }
      commentCount
    }
  }
`

export const CREATE_PHOTO_MUTATION = `
mutation($picture: String!) {
  createPhoto(
    picture: $picture,
  ) {
    picture
  }
}
`

export const CREATE_BANNER_MUTATION = `
mutation($banner: String!) {
  createBanner(
    banner: $banner,
  ) {
    banner
  }
}
`





