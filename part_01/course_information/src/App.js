const Header = ({ courseName }) => {
  return <h1>{courseName}</h1>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return parts.map((section) => (
    <Part
      key={section.name}
      name={section.name}
      exercises={section.exercises}
    />
  ));
};

const Total = ({ courseTotal }) => {
  return <p>Number of exercises {courseTotal}</p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  const courseTotal = course.parts.reduce((acc, course) => {
    return (acc += course.exercises);
  }, 0);

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total courseTotal={courseTotal} />
    </div>
  );
};

export default App;
