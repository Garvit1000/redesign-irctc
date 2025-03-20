// This is a Web Worker file for offloading heavy computations

// Example function that could be offloaded to a worker
const calculateComplexData = (data: any) => {
  // Simulate heavy computation
  let result = { ...data };
  
  // Do complex calculations here
  for (let i = 0; i < 1000000; i++) {
    result.value = (result.value || 0) + Math.sqrt(i);
  }
  
  return result;
};

// Listen for messages from the main thread
self.addEventListener('message', (e) => {
  if (e.data.type === 'calculate') {
    const result = calculateComplexData(e.data.payload);
    // Send the result back to the main thread
    self.postMessage({ type: 'result', payload: result });
  }
});

export {}; 