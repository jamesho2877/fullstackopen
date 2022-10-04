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

export default Course;
