import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CognitoProvider from "next-auth/providers/cognito";


export const authOptions: NextAuthOptions = {

  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID ?? "",
      clientSecret: process.env.COGNITO_CLIENT_SECRET ?? "",
      issuer: process.env.COGNITO_ISSUER ?? "",
      authorization: { params: { scope: "openid aws.cognito.signin.user.admin com.tacts.og/company.read com.tacts.og/company.write" } }
    })
  ],
  callbacks: {
   
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token to the token right after signin
     // console.log("in callback");
      
      if (account) {
        token.accessToken = account.access_token;
        
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
     // console.log("in callback session");
     // console.log(token)
     // console.log("user in callback session");
    //  console.log(session)
      if(!token.accessToken)
      return session
       
      const target = `${process.env.DATA_CLIENT_API}/coreapiv1/user?subId=${token.sub}`
      const response = await fetch(target, {
        method: 'GET',   
        headers: {
          'x-api-key' : `${process.env.BLACKSTONEAPI}` 
          ,'Content-Type' :  'application/json' 
          ,'Authorization' :  token.accessToken 
        }
      })

    // Handle response if necessary
    const data = await response.json();
    console.log(data);
      if (data.response[0].companyId){
        session.companyId = data.response[0].companyId
      }
      session.subId = token.subId
      session.accessToken = token.accessToken
      return session
    }
  },
  debug: process.env.NODE_ENV === 'development' ? true : false
};

export default NextAuth(authOptions);
