// Calculating days remaining until deadline.

export const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
  
    return remainingDays.toFixed(0);
  };

// Calculating percentage of donation goal raised.
 
export const percentRaised = (amountCollected, target) => {
   const fraction = amountCollected / target
   const percent = parseFloat((fraction * 100).toFixed(2))
   
   return percent; 
  ;}

// Calculating percentage of progress bar that should be filled.

  export const calculateBarPercentage = (goal, raisedAmount) => {
    const percentage = Math.round((raisedAmount * 100) / goal);
  
    return percentage;
  };
  
// Defining a function to check if an Image has been uploaded / exists.

  export const checkIfImage = (url, callback) => {
    const img = new Image();
    img.src = url;
  
    if (img.complete) callback(true);
  
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
  };