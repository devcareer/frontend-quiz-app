window.onload = function () {
  // Assigning DOM elemets to variables
  const questionNumber = document.getElementById("question-id");
  const questionText = document.getElementById("question-text");
  const choices = document.getElementsByClassName("choices__text");
  const btn = document.getElementsByClassName("btn")[0];

  // Assumed or fake data array containing questions and their choices as objects
  const data = [
    {
      question: "Which one of these is not like the other one?",
      choices: ["A", "B", "C", "4"],
    },
    {
      question: "Which one of these is not like the other one?",
      choices: ["1", "2", "3", "A"],
    },
    {
      question: "Which one of these is not like the other one?",
      choices: ["Banana", "Dogs", "Monkey", "Cats"],
    },
  ];

  // Dynamically rendering data content
  let count = 0;

  function render() {
    questionNumber.innerText = count + 1;
    questionText.append(` ${data[count].question}*`);
    Array.from(choices).forEach(
      (choice, index) => (choice.textContent = data[count].choices[index])
    );
  }
  render();

  // Button event handler
  btn.onclick = () => {
    count = count >= data.length - 1 ? 0 : count + 1;

    questionText.removeChild(questionText.lastChild);
    render();
  };
};
