import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(res => res.json())
    .then(questions => setQuestions(questions))
  },[])

  function handleDeleteButton(id){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE",
    })
    .then(r => r.json())
    .then(() => {
      const newQuestions = questions.filter((quiz) => quiz.id !== id);
    setQuestions(newQuestions);
  })
  }

  

  const questionItems = questions.map((quiz) => (
    <QuestionItem
      key={quiz.id}
      question={quiz}
      onDeleteQuestion={handleDeleteButton}
      // onAnswerChange={handleAnswerChange}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
