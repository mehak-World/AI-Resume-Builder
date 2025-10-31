import React, { useState, useEffect } from 'react';
import ClassicTemplate from '../assets/templates/ClassicTemplate';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import ModernTemplate from '../assets/templates/ModernTemplate';
import MinimalImageTemplate from '../assets/templates/MinimalImageTemplate';
import MinimalTemplate from '../assets/templates/MinimalTemplate';

const Preview = () => {
  const { resume_id } = useParams();
  const { user } = useUser();
  const id = user?.id;

  const [resData, setResData] = useState({});

  useEffect(() => {
    const fetchResData = async () => {
      if (!id) return; // wait until user is loaded
      const res = await axios.get(`http://localhost:3000/resumes/${id}/${resume_id}`);
      if (res) {
        setResData(res.data);
      }
    };

    fetchResData();
  }, [id, resume_id]);

  const template = resData.template;
  const accent = resData.accent;

  const downloadResume = () => {
    window.print();
  }

  return (
    <div className="flex justify-center bg-gray-200 min-h-screen">
      {!user?.id && <div>This is not a valid user.</div>}

      <div>
      {user?.id && (
        <div className = "max-w-3xl my-4">
          {template === 'Classic' && (
            <ClassicTemplate data={resData} accentColor={accent} />
          )}
          {template === 'Modern' && (
            <ModernTemplate data={resData} accentColor={accent} />
          )}
          {template === 'Minimal Image' && (
            <MinimalImageTemplate data={resData} accentColor={accent} />
          )}
          {template === 'Minimal' && (
            <MinimalTemplate data={resData} accentColor={accent} />
          )}
        </div>
      )}
      </div>
      

    </div>
  );
};

export default Preview;
