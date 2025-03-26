import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

interface Credentials {
  email: string;
  password: string;
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as Credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) return null;

          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],

  // ✅ Store user after Google sign-in
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await connectMongoDB();

          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              password: "", // optional, since it's Google login
            });
            console.log("✅ Google user saved to DB");
          } else {
            console.log("🔁 Google user already exists");
          }
        } catch (error) {
          console.error("Error saving Google user:", error);
          return false;
        }
      }
      return true;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// ------------------------------------------------------------------------------------------------------------>>

// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/user";
// import bcrypt from "bcryptjs";
// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

// interface Credentials {
//   email: string;
//   password: string;
// }

// const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),

//     CredentialsProvider({
//       name: "credentials",
//       credentials: {},
//       async authorize(credentials) {
//         const { email, password } = credentials as Credentials;

//         try {
//           await connectMongoDB();
//           const user = await User.findOne({ email });

//           if (!user) return null;

//           const passwordMatch = await bcrypt.compare(password, user.password);
//           if (!passwordMatch) return null;

//           return user;
//         } catch (error) {
//           console.log(error);
//           return null;
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET!,
//   pages: {
//     signIn: "/",
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
