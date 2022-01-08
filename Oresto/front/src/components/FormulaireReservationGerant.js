import { useState } from "react";
import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import ReponsesDeQuestion from "./ReponsesDeQuestion";
import { useDispatch } from "react-redux";
import { updateFormReservationAction } from "../services/actions/gerantActions";
const FormulaireReservationGerant = ({ formReservation }) => {
  const [x, setX] = useState([...formReservation]);
  const dispatch = useDispatch();
  const handleAdd = () => {
    setX([...x, { question: "", reponses: ["", "", "", ""] }]);
  };
  const handleConfirmer = () => {
    console.log("X=:", x);
    dispatch(updateFormReservationAction(x));
  };

  return (
    <Card style={{ width: "70vw" }}>
      <CardContent>
        {x.map((element, index) => (
          <Card key={index} variant="outlined" style={{ marginTop: "1rem" }}>
            <CardContent>
              <ReponsesDeQuestion
                question={element.question}
                reponses={element.reponses}
                index={index}
                setX={setX}
                x={x}
              />
            </CardContent>
          </Card>
        ))}
      </CardContent>
      <CardActions>
        <Button size="small" color="" onClick={handleAdd}>
          Ajouter Question
        </Button>
        <Button onClick={handleConfirmer} style={{ marginLeft: "auto" }}>
          confirmer
        </Button>
      </CardActions>
    </Card>
  );
};

export default FormulaireReservationGerant;
