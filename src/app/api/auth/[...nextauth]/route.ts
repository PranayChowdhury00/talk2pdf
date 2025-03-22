import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface Credentials {
  email: string;
  password: string;
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        // Type assertion to let TypeScript know about the shape of credentials
        const { email, password } = credentials as Credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

//-------------------------------------------------------------
// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/user";
// import bcrypt from "bcryptjs";
// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {},
//       async authorize(credentials) {
//         // const user = { id: "1" };
//         // return user;
//         const { email, password } = credentials;
//         try {
//           await connectMongoDB();
//           const user = await User.findOne({ email });

//           if (!user) {
//             return null;
//           }

//           const passwordMatch = await bcrypt.compare(password, user.password);
//           if (!passwordMatch) {
//             return null;
//           }

//           return user;
//         } catch (error) {
//           console.log(error);
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/",
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
