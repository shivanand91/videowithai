import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { ConnectToDB } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "Enter your password"},
            },

            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }
                try {
                    await ConnectToDB();
                    const user = await User.findOne({ email: credentials.email, password: credentials.password })
                    
                    if(!user) {
                        throw new Error("Invalid email or password");
                    }

                    const isValid = await bcrypt.compare(credentials.password, user.password);

                    if (!isValid) {
                        throw new Error("Invalid email or password");
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        // name: user.name || "User",
                        // image: user.image || null,
                    };

                } catch (error) {
                    console.error("Error during authorization:", error);
                    throw new Error("Error during authorization: " + error);
                }
            }, 

        })


    // GithubProvider({
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET!,
    // }),
    // ...add more providers here
    ],
    
    callbacks: {
        async jwt ({ token, user }) {
            if (user) {
                token.id = user.id;
                // token.name = user.name || "User";
                // token.image = user.image || null;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                // session.user.name = token.name || "User";
                // session.user.image = token.image || null;    
            }
            return session;
        },
    },

    pages: {
        signIn: "/login",
        error: "/login",
    },

    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days

    },
    secret: process.env.NEXTAUTH_SECRET,
};