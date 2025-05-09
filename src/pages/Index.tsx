
import { Navigate } from "react-router-dom";

const Index = () => {
  // Redirect to Public Job Listings
  return <Navigate to="/public/job-listings" replace />;
};

export default Index;
