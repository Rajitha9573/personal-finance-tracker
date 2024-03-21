import React from "react";
import { Card, Row } from "antd";
import Button from "../../Button/Button";
import "./style.css"

const Cards = ({showIncomeModel, showExpenceModel}) => {
  return (
    <div>
      <Row className="rowCard">
        <Card className="myCards" title="Current Balance">
          <p>0</p>
          <Button text="Reset Balance" />
        </Card>
        <Card className="myCards" title="Total Income">
          <p>0</p>
          <Button text="Add Income" onClick={showIncomeModel}/>
        </Card>
        <Card className="myCards" title="Total Expenses">
          <p>0</p>
          <Button text="Add Expense" onClick={showExpenceModel} />
        </Card>
       
      </Row>
    </div>
  );
};

export default Cards;
