import NextAuth from "next-auth";

const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
})