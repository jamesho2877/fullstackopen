import { useState } from "react";

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistic = ({ text, counter }) => {
  return <p>{text}: {counter}</p>;
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
      <Statistic text="good" counter={good} />
      <Statistic text="neutral" counter={neutral} />
      <Statistic text="bad" counter={bad} />
    </>
  );
};

export default App;
