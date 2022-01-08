import { React, useState } from "react";
import { Grid, TextField } from "@material-ui/core";

const ReponsesDeQuestion = ({ question, reponses, index, setX, x }) => {
  const [reponsesQuestion, setReponsesQuestion] = useState({
    question: question,
    reponses: reponses,
  });

  const handleChangeReponse = (index1) => (event) => {
    // let inter = { ...reponsesQuestion };
    // inter.reponses[index1] = event.target.value;

    let rep = x[index].reponses;
    rep[index1] = event.target.value;
    setX(x);

    // setReponsesQuestion({ ...inter });
  };
  const handleChangeQuestion = (event) => {
    let obj = { ...reponsesQuestion };
    obj.question = event.target.value;
    x[index].question = event.target.value;
    setX(x);
    setReponsesQuestion({ ...obj });
  };
  console.log(reponsesQuestion);
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <TextField
          variant="outlined"
          fullWidth
          label={`question`}
          defaultValue={reponsesQuestion.question}
          onChange={handleChangeQuestion}
        />
        {/*
         */}
      </Grid>
      <Grid item>
        <Grid container spacing="2">
          {reponsesQuestion.reponses.map((reponse, index1) => (
            <Grid item>
              <TextField
                variant="outlined"
                defaultValue={reponse}
                label={`reponse ${index1 + 1}`}
                onChange={handleChangeReponse(index1)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ReponsesDeQuestion;
