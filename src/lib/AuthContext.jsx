import { createContext, useState, useEffect, useContext } from "react";
import { ID, account, avatars, createUser } from "./appwrite";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true)

    console.log('userInfo',userInfo)

    try{
        await account.createEmailPasswordSession(userInfo.email, userInfo.password)
        let accountDetails = await account.get();
        setUser(accountDetails)
        navigate('/home')
    }catch(error){
        console.error(error)
    }
    setLoading(false)
 }

 const logoutUser = async () => {
  await account.deleteSession('current');
  setUser(null)
  navigate('/')
}

const registerUser = async (userInfo) => {

  try{
      navigate('/onboarding')
      await account.create(ID.unique(), userInfo.email, userInfo.password1, userInfo.name);

      await account.createEmailPasswordSession(userInfo.email, userInfo.password1)
      let accountDetails = await account.get();
      const avatarUrl = avatars.getInitials(userInfo.name)
      await createUser({
        accountId: accountDetails.$id,
        email: userInfo.email,
        username: userInfo.name,
        avatar: avatarUrl
      })
      setUser(accountDetails)
      
  }catch(error){
      throw new Error(error)
  }

  setLoading(false)
}

  const checkUserStatus = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.error("Error checking user status:", error); // Log or handle error
    } finally {
      setLoading(false);
    }
  };

  const contextData = {
    user,
    loading, // Add loading state to context
    loginUser,
    logoutUser,
    registerUser
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;