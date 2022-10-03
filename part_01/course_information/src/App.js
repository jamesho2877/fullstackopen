const Header = ({ courseName }) => {
  return <h1>{courseName}</h1>;
};

const Content = ({ sections }) => {
  return sections.map((section) => (
    <p key={section.name}>
      {section.name} {section.exercises}
    </p>
  ));
};

const Total = ({ courseTotal }) => {
  return <p>Number of exercises {courseTotal}</p>;
};

const App = () => {
  const courseName = "Half Stack application development";
  const sections = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  const courseTotal = sections.reduce((acc, course) => {
    return (acc += course.exercises);
  }, 0);

  return (
    <div>
      <Header courseName={courseName} />
      <Content sections={sections} />
      <Total courseTotal={courseTotal} />
    </div>
  );
};

export default App;
