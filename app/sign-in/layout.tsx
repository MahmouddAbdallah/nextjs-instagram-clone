import { redirect } from 'next/navigation'
import { cookies } from "next/headers";

interface propsRoot {
  children: React.ReactNode
}
const SignInLayout: React.FC<propsRoot> = ({ children }) => {
  const token = cookies().get('token_auth')
  if (token) {
    redirect('/')
  }
  return (
    <div>
      {children}
    </div>
  )
}
export default SignInLayout;
