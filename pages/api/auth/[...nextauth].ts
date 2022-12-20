import NextAuth from 'next-auth';
import TwitterProvider from "next-auth/providers/twitter";

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_API_KEY!,
      clientSecret: process.env.TWITTER_API_SECRET!
    })
  ],

  callbacks: {
    async jwt({ token, account, profile, isNewUser}) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.access_token = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.access_token = token.sub
      return session
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    
  }
});

