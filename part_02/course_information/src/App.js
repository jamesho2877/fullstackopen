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
  return <p><b>Total of {courseTotal} exercises</b></p>;
};

const Course = ({ course }) => {
  const courseTotal = course.parts.reduce((acc, course) => {
    return (acc += course.exercises);
  }, 0);

  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total courseTotal={courseTotal} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        id: 1,
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        id: 2,
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        id: 3,
        name: 'State of a component',
        exercises: 14,
      },
      {
        id: 4,
        name: 'Redux',
        exercises: 11,
      }
    ]
  };

  return <Course course={course} />;
};

export default App;
