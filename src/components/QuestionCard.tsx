import * as React from "react";
import styled from "styled-components";

//import types
import { AnswerObject } from "../App";

//import styling
import { Wrapper } from "./QuestionCard.styles";

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: AnswerObject | undefined;
  questionNum: number;
  totalQuestions: number;
};

type StyledButtonProps = {
  correct: boolean;
  userClicked: boolean;
};

type ButtonProps = {
  className?: string;
  children?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ className, children }) => (
  <div className={className}>{children}</div>
);

const StyledButton = styled(Button)<StyledButtonProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  transition: all 0.3s ease;

  :hover {
    opacity: 0.8;
  }

  button {
    cursor: pointer;
    user-select: none;
    width: 50%;
    background: ${({ correct, userClicked }) =>
      correct ? "green" : !correct && userClicked ? "red" : null};
    margin-bottom: 5px;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 0.8rem;
    border: 1px solid #aaa;
  }
`;

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNum,
  totalQuestions
}) => {
  return (
    <Wrapper>
      <p className="number">
        Question: {questionNum} / {totalQuestions}
      </p>
      <p className="question" dangerouslySetInnerHTML={{ __html: question }} />

      {answers.map((answer: string) => (
        <StyledButton
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}
          key={answer}
        >
          <button disabled={!!userAnswer} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }}></span>
          </button>
        </StyledButton>
      ))}
    </Wrapper>
  );
};

export default QuestionCard;
