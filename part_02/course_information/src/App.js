const Header = ({ courseName }) => {
  return <h2>{courseName}</h2>;
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
  return (
    <p>
      <b>Total of {courseTotal} exercises</b>
    </p>
  );
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
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  const courseDOM = courses.map((course) => (
    <Course key={course.id} course={course} />
  ));

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courseDOM}
    </div>
  );
};

export default App;
