import React from 'react';

interface CapitalizeWordProps {
  inputString: string;
}

const CapitalizeWord: React.FC<CapitalizeWordProps> = ({ inputString }) => {
  // Split the input string into words
  const words = inputString.trim().split(/\s+/);

  // Extract the first letter of each word and concatenate them
  const initials = words.map(word => word.charAt(0).toUpperCase()).join('');

  return <>{initials}</>;
};

export default CapitalizeWord;
