import { Outlet, Navigate } from "react-router-dom" 
type TProps = {
    isAuthenticated?: boolean,
    redirectPath?: string
}

export const PrivatRoutes:React.FC<TProps> = ({isAuthenticated, redirectPath = '/'}) => {
    return isAuthenticated ? <Outlet/> : <Navigate to={redirectPath}/>
 };