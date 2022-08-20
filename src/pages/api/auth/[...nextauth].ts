import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
            scope: "profile email spreadsheets",
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
        }
      }
   }),
  ],
  callbacks: {
    async jwt({ account, user, token, profile, isNewUser}) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    // async signIn(p) {
    //   if (account?.accessToken) {
    //     token.accessToken = account.accessToken;
    //   }
    //   return token;
    // },
  },
//   secret: process.env.SECRET,
});