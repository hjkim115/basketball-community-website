import "./globals.css"
import Header from "./components/Header"
import { AuthContextProvider } from "./context/AuthContext"

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <Header/>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
