import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { toast, Toaster} from 'sonner';
import Login from "./components/Login";
import Homepage from "./components/Homepage";

export default function App() {
 const [isLoggedIn, setLoggedIn] = useState(false);
 const [credentials, setCredentials] = useState(null); 


  const handleLogin = (user) => {
    setLoggedIn(true);
    setCredentials(user);
  }
 const handleLogout = () => {
  setLoggedIn(false);
  setCredentials(null);
  toast.info("Logged out successfully!", {
    description: "You have logged out of your account.",
  });

  
  
 };

 return (
  <>
    {isLoggedIn ? (
      <Homepage userName={credentials?.name} onLogout={handleLogout}/>
    ) : (
      <Login onLogin={handleLogin}/>
    )}
    <Toaster />
  
  </>
  
 );

}

