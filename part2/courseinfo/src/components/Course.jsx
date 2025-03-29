const Header = (props) => <h2>{props.course}</h2>

const Content = (props) => (
  <div>
    {props.parts.map(part => <Part key={part.id} part={part} />)}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <h3>Total of {props.total} exercises</h3>

const Course = ({course}) => {
  const total = course.parts.reduce(
    (partialSum, currentValue) => partialSum + currentValue.exercises,
    0
  )
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  )

}

export default Course
