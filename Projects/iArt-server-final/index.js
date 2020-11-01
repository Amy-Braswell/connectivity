const { ApolloServer, gql } = require("apollo-server");
const { GraphQLScalarType } = require('graphql')
// kind confirms the type of a thing coming in
const { Kind } = require('graphql/language') 

// Schemas define your typeDefs, queries,mutations, subscriptions
// Types let you request a certain type of data correctly - defines the types of all of our data
// You have to explicitly state all of your data
// Options are String, Int, Float, Boolean, ID (serialized like a string but unique)
// You can also create your own type such as a Gallery
// You can also create enumerators which only allow specific options
const typeDefs = gql`

  # A scalar lets you define the date as it comes in and goes out from your server
  scalar Date


  enum Status {
    # inherently these will come back as strings
    WATCHED
    INTERESTED
    NOT_INTERESTED
    UNKNOWN
  }

  enum GalleryStatus {
    NEW
    ENDINGSOON
    VIEWED
  }
  
  type Actor {
    id: ID!
    name: String!
  }

  type Movie {
    id: ID!
    title: String!
    releaseDate: Date
    rating: Int
    status: Status
    # use an array because there is more than one
    actor: [Actor]
  }
#  remember to convert new Gallery and Exhibit keys in client code
  type Gallery {
    # use Int or Float only
    id: ID!
    name: String!
    logo: String
    website: String!
    phone: String
    address: String
    # don't need an array for currentShow and previousShow as there is only one exhibit 
    galleryStatus: GalleryStatus
    exhibit: [Exhibit]
    previousShow: [Exhibit]
  }

  type Exhibit {
    id: ID!
    artist: String!
    title: String!
    curator: String
    date: String!
    media: [String]!
    startDate: Date!
    endDate: Date!
    showTeaser: String!
    featureImage: String!
  }

  type Chat {
    # double check that this is correct
    # probably have to get userName from redux store
    id: ID!
    userName: String!
    content: String!
  }

# These are the Schema
# Queries get data
# You can say get a type you have created
  type Query {
    movies: [Movie]
    movie(id: ID): Movie
    galleries: [Gallery]
    gallery(id: ID): Gallery
    chats: [Chat]
  } 
`

// MOCK STORE -MOCK STORE -MOCK STORE -MOCK STORE
const actors = [
  {
    id: "gordon",
    name: "Gordon Liu"
  },
  {
    id: "jackie",
    name: "Jackie Chan"
  }
]

const chats = [
  {
    id: '1',
    userName: 'Gallery Goer1',
    content: 'Love this show!!!'
  },
  {
    id: '2',
    userName: 'Gallery Goer2',
    content: 'Indeed, it is amazing!!!'
  },
  {
    id: '3',
    userName: 'Gallery Goer1',
    content: 'I must see more!!!'
  }
]

const movies = [
  {
    id: '1',
    title: "5 Deadly Venoms",
    releaseDate: new Date("10-12-1983"),
    actor: [
      {
        id: "jackie"
      }
    ]
  },
  {
    id: '2', 
    title: "36th Chamber",
    releaseDate: new Date("1-17-1971"),
    actor: [
      {
        id: "gordon"
      }
    ]
  }
];

const galleries = [
    {
        id: '1',
        name: 'My Gallery 1',
        address: '124 My Gallery Street',
        // Can't get enumerator to work
        galleryStatus: 'NEW',
        exhibit: [
          {
          id: '1'
          }
        ],
        previousShow: [
          {
          id: '2'
          }
        ]     
    },
    {
        id: '2',
        name: 'My Gallery 2',
        address: '352 My Gallery Ave',
        exhibit: [
          {
          id: '2'
          }
        ],
        previousShow: [
          {
          id: '1'
          }
        ],
    }
]

const exhibits = [
  {
    id: '1',
    artist: 'Great Artist',
    title: 'The Best Show On Earth',
    curator: 'Art Gallery Chick',
    date: ("10-17-2020 to 01-01-2021"),
    media: ["SCULPTURE"],
    startDate: new Date("10-17-2020"),
    endDate: new Date("01-01-2021"),
    showTeaser: 'This a great show!',
    featureImage: 'This is my feature image'
  },
  {
    id: '2',
    artist: 'Amazing Artist',
    title: 'An Even Better Show',
    curator: 'Art Gallery Dude',
    date: ("11-17-2020 to 02-13-2021"),
    media: ["PAINTING"],
    startDate: new Date("10-17-2020"),
    endDate: new Date("02-13-2021"),
    showTeaser: 'This a great show!',
    featureImage: 'This is my feature image'
  },
]
//END OF MOCK STORE -END OF MOCK STORE -END OF MOCK STORE 

// You must include all of your types in your resolver list
const resolvers = {
  Query: {
    chats: () => {
      // return chats variable
      return chats
    },
    movies: () => {
      // include whatever you want returned here
      // it MUST be the same shape as what is defined in the type
      // return movies variable 
      return movies
    },
    // arguments are: (obj, args, context, info ) but you can replace args with the object of what you need
    // obj is often not used... it is the result returned from the resolver on the parent field
    // info is also not often used except in advanced cases... 
    // it contains information about the state of the execution
    movie: (obj, {id}, context, info ) => {
      const foundMovie = movies.find((movie) => {
        return movie.id ===id
      })
      return foundMovie
    },
    galleries: () => {
      // return galleries variable 
      return galleries
    },
    gallery: (obj, {id}, context, info) => {
      // .find() iterates over an array so we have access to each object in the array
      // and returns true if the condition we specify is true (or gallery.id ===id)
      const foundGallery = galleries.find((gallery) => {
        return gallery.id ===id
      })
      return foundGallery
    }
  },
  
  // resolving the actor type to simplify Movies query
  // this is a resolver to resolve a custom type... use 
  // this whenever you need a nested type (ie: Gallery > Exhibit)

  Movie: {
    actor: (obj, arg, context) => {
      // DB Call
      const actorIds = obj.actor.map(actor => actor.id);
      const filteredActors = actors.filter(actor => {
        return actorIds.includes(actor.id);
      });
      return filteredActors;
    }
  },

  // resolving the Gallery type to include Exhibit type
  Gallery: {
    exhibit: (obj, arg, context) => {
      // DB Call to filter things out
      const currentShowId = obj.exhibit.map(exhibit => exhibit.id);
      const filteredCurrentShows = exhibits.filter(exhibit => {
        // includes()looks at an array object to see if the string exists on the object
        return currentShowId.includes(exhibit.id);
      });
      return filteredCurrentShows;
    },
    previousShow: (obj, arg, context) => {
      const previousShowId = obj.exhibit.map(exhibit => exhibit.id)
      const filteredPreviousShows = exhibits.filter(exhibit => {
        return previousShowId.includes(exhibit.id)
      })
      return filteredPreviousShows
    }
  },


  // This is the DATE Scalar
  // Scalar needs to be defined OUTSIDE of the Query resolver
  Date: new GraphQLScalarType({
    name: "Date",
    description: "it is a date! deal with it",
    parseValue(value) {
      // the value from the client
      return new Date(value)
    },
    serialize(value) {
      // the value sent to the client
      // this allows us to get our date as a serialized number that is the date down to milliseconds
      return value.getTime()
    },
    parseLiteral(ast) {
      if(ast.kind = Kind.INT) {
        return new Date(ast.value)
      }
      return null
    }
  })
}

// initiate the server
const server = new ApolloServer({ typeDefs, resolvers})

server.listen().then(({url }) => {
  console.log(`Server started at ${url}`)
})






  

