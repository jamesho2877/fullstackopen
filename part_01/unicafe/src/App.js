import { useState } from "react";

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, counter }) => {
  return <p>{text}: {counter}</p>;
};

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <div>No feedback given</div>;
  }

  const totalFeedback = good + neutral + bad;
  const averagePoint = ((good*1 + neutral*0 + bad*(-1))/totalFeedback) || 0;
  const positivePercentage = ((good/totalFeedback) || 0) * 100;

  return (
    <>
      <StatisticLine text="good" counter={good} />
      <StatisticLine text="neutral" counter={neutral} />
      <StatisticLine text="bad" counter={bad} />
      <StatisticLine text="all" counter={totalFeedback} />
      <StatisticLine text="average" counter={averagePoint} />
      <StatisticLine text="positive" counter={`${positivePercentage} %`} />
    </>
  )
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);


  return (
    <>
      <Header text="give feedback"/>
      <Button text="good" onClick={() => setGood(prev => prev+1)} />
      <Button text="neutral" onClick={() => setNeutral(prev => prev+1)} />
      <Button text="bad" onClick={() => setBad(prev => prev+1)} />
      <Header text="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
