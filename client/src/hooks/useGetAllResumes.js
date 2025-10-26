import { useEffect, useState } from "react";
import axios from "axios";

const useGetAllResumes = (userId) => {
  const [allResumes, setAllResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResumes = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/${userId}/resumes`);
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
