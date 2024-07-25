const formatDate = (dateString: string): string => {
    const dateObject = new Date(dateString);
  
    // Convert to the desired format
    let formattedDate = dateObject.toLocaleString('en-US', { 
      month: 'long',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  
    // Remove "at" from the formatted date string
    formattedDate = formattedDate.replace(/\s+at\s+/i, ' ');
  
    return formattedDate;
  }
  
  export default formatDate;
  