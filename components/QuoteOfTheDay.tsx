import React, { useEffect, useState } from 'react';

const QuoteOfTheDay = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => setQuote(data.content));
  }, []);

  return (
    <div id="quote-of-the-day" className="text-center py-4">
      <h2 className="text-xl font-bold">Quote of the Day</h2>
      <p className="text-lg">{quote}</p>
    </div>
  );
};

export default QuoteOfTheDay;