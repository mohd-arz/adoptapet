import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "~/server/db";
import { Prisma } from "@prisma/client";

interface User {
  id: string;
  name: string;
  email: string;
}
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "login",
      name: "login",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
        type: { type: "text" },
      },
      async authorize(credentials, req) {
        const type = credentials?.type as string;
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        const user = await db.user.findUnique({
          where: {
            email: email,
            type,
          },
          select: {
            id: true,
            name: true,
            email: true,
            type: true,
            password: true,
          },
        });

        if (!user) {
          // Handle the error appropriately, e.g., throw an error
          throw new Error("No User Found");
        }
        if (user && (await bcrypt.compare(password, user.password))) {
          return {
            id: user.id.toString(), // Convert id to string
            name: user.name,
            email: user.email,
            type: user.type,
          } as User;
        } else {
          throw new Error("Wrong Credentials");
        }
      },
    }),
    CredentialsProvider({
      id: "signup",
      name: "signup",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Name" },
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
        type: { type: "text" },
      },
      async authorize(credentials) {
        const name = credentials?.name as string;
        const email = credentials?.email as string;
        const type = credentials?.type as string;
        const password = credentials?.password as string;
        const hashedPass = await bcrypt.hash(password, 10);
        try {
          const user = await db.user.create({
            data: {
              name,
              email,
              password: hashedPass,
              type: type,
            },
          });
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            type: user.type,
          } as User;
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
              throw new Error(
                "Unique constraint failed on the field: " + error.meta?.target,
              );
            }
            throw new Error("Known Request Error: " + error.message);
          } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
            throw new Error("Unknown Request Error: " + error.message);
          } else {
            throw new Error("Other Error: " + error);
          }
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    updateAge: 3 * 60 * 60,
    maxAge: 3 * 60 * 60,
    strategy: "jwt",
  },
  jwt: {
    maxAge: 3 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id;
        token.type = user.type;
      }
      return token;
    },
    session: ({ session, token }: any) => {
      if (session.user) {
        session.user.id = token.uid;
        session.user.type = token.type;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sellers/signin/",
    newUser: "/sellers/signup",
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
