const {gql,ApolloServer} = require("apollo-server");

let frutas =[
    {
        id:1,
        name:"maça"
    },
    {
        id:2,
        name:"banana"
    },
    {
        id:3,
        name:"uva"
    },
    {
        id:4,
        name:"mamão"
    }
]

const typeDefs = gql`

    type Fruta {
        id:Int!
        name:String!    
    }

    type Query { 
        frutas:[Fruta]
        fruta(id:Int!):Fruta
    }
    type Mutation {
        create(id:Int!,name:String!):Fruta
        updata(id:Int!,name:String):Fruta
    }
`;
const resolvers = {
    Query:{
        frutas:()=>{
            return frutas
        },
        fruta:(_,{id})=>{
          return  frutas.find((fruta)=>{
            fruta.id === id
          })  
        }
    },
    Mutation:{
        create:(_,{id, name})=>{
            const fruta = {
                id,
                name
            }
            frutas.push(fruta)
            return fruta
        },
        updata:(_,{id,name})=>{
            const fruta = frutas.find((fruta) => fruta.id === id);
            fruta.id = fruta.id;
            fruta.name = name ? name : fruta.name;
            return fruta;
        }
       
    } 

}


const app = new ApolloServer({ typeDefs, resolvers });

app.listen().then(({ url }) => console.log(`Server running on ${url}`));