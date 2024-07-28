import { NextAuthOptions, Session, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { api } from "~/trpc/server"
export const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id:"login",
      name:"login",
      credentials:{
        email:{label:'Email',type:'text',placeholder:'Email'},
        password:{label:'Password',type:'password',placeholder:'********'}
      },
      async authorize(credentials, req) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;
        const res = await api.auth.signin({
          email,
          password,
        })
        if(res.user)
        return {
          id:res.user.id.toString(),
          email:res.user.email,
        };
        throw new Error(res.error);
      },
    }),
    CredentialsProvider({
      id:"signup",
      name:"signup",
      credentials:{
        name:{label:'Name',type:'text',placeholder:'Name'},
        email:{label:'Email',type:'text',placeholder:'Email'},
        password:{label:'Password',type:'password',placeholder:'********'}
      },
      async authorize(credentials, req) {
        const name = credentials?.name as string;
        const email = credentials?.email as string;
        const password = credentials?.password as string;
        const res = await api.auth.signup({
          name,
          email,
          password,
          type:"seller",
        })
        if(res.user)
          return {
            id:res.user.id.toString(),
            email:res.user.email,
          };
        throw new Error(res.error);
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    updateAge: 3 * 60 * 60,
    maxAge: 3 * 60 * 60,
  },
  jwt: {
    maxAge: 3 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ user, token }: any) => {
    if (user) {
        token.uid = user.id;
    }
    return token;
    },
    session: ({ session, token, user }: any) => {
        if (session.user) {
            session.user.userId = token.uid
        }
        return session
    }
  },
  pages: {
    signIn: '/auth/signin',
    newUser: '/seller/signup'
  }
}

export const getServerAuthSession = () => getServerSession(authOptions);