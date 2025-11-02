import { useEffect, useState } from "react";
import axios from "axios";

const useGetAllResumes = (userId) => {
  const [allResumes, setAllResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchResumes = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        console.log(userId);
        const response = await axios.get(`${url}/resumes/${userId}`);
        console.log(response);
        setAllResumes(response.data || []);
      } catch (err) {
        console.error("Error fetching resumes:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [userId]);

  return { allResumes, setAllResumes, loading, error };
};

export default useGetAllResumes;
