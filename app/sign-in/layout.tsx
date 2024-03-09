
interface propsRoot {
  children: React.ReactNode
}
const SignInLayout: React.FC<propsRoot> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}
export default SignInLayout;
