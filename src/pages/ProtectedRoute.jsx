import Home from './Home';

const ProtectedRoute = () => {
    {
      console.log("Protected Route Rendered", new Date().toLocaleString());
    }
    const user = true;
  
    if(user) {
        return (<Home />);
    }

    if(!user) {
        return (<h1>Access Denied</h1>);
    }
}

export default ProtectedRoute
