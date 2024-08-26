export const getUser = async () => {
  const token = localStorage.getItem("token");
  
  if (token) {
    try {
      const response = await fetch("http://localhost:8081/getuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err.message);
      return null; 
    }
  }
  return null;
};
