import { Navigate } from "react-router-dom";
import { User} from "../types";
import type { JSX } from "react";

interface Props {
  user: User | null;
  children: JSX.Element;
}

// Only accessible if logged in
export const ProtectectedRoute = ({ user, children}: Props) => {
    return user ? children : <Navigate to="/login" replace/>;
};


// Only accessible if NOT logged in
export const PublicRoute = ({ user, children }: Props) => {
  return !user ? children : <Navigate to="/dashboard" replace />;
};