// export const authConfig = {
//   pages: {
//     signIn: "/login",
//   },
//   providers: [],
//   callbacks: {
//     // FOR MORE DETAIL ABOUT CALLBACK FUNCTIONS CHECK https://next-auth.js.org/configuration/callbacks
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//       }
//       return session;
//     },
//     authorized({ auth, request }) {
//       const user = auth?.user;

//       const isOnBlogPage = request.nextUrl?.pathname.startsWith("/profile");
//       const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

//       // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE

//       if (isOnBlogPage && !user) {
//         return false;
//       }

//       // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE

//       if (isOnLoginPage && user) {
//         return Response.redirect(new URL("/", request.nextUrl));
//       }

//       return true;
//     },
//   },
// };
