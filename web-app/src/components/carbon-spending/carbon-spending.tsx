import "./carbon-spending.css";
import React, { useState } from "react";
import { TRANSPORTS_PARAMS } from "./utils";
import SliderComponent from "./slider";
import { gql, useMutation } from "@apollo/client";
import {
  CreateSpendingMutation,
  CreateSpendingMutationVariables,
} from "../../gql/graphql";

const CREATE_SPENDING = gql`
  mutation CreateSpending(
    $title: String!
    $date: DateTime!
    $unit: Float!
    $weight: Float!
    $categoryName: String!
  ) {
    createSpending(
      title: $title
      date: $date
      unit: $unit
      weight: $weight
      categoryName: $categoryName
    ) {
      title
      date
      unit
      weight
      category {
        categoryName
      }
    }
  }
`;

function CarbonSpending() {
  const [selectedIcon, setSelectedIcon] = useState<number>(0);
  const [unit, setUnit] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [categoryName, setCategoryName] = useState<string>("");

  const [createSpending, { loading }] = useMutation<
    CreateSpendingMutation,
    CreateSpendingMutationVariables
  >(CREATE_SPENDING);

  const formatDate = new Date(date);

  const handleSelectCategory = (id: number, category: string) => {
    setSelectedIcon(id);
    setCategoryName(category);
    setUnit(0);
  };

  const submit = async () => {
    try {
      await createSpending({
        variables: {
          title,
          date: formatDate,
          unit,
          weight,
          categoryName,
        },
      });
    } catch (error) {
      console.error("erreur");
    }
  };

  const roundedValue =
    selectedIcon === 2
      ? unit * 0.1482
      : selectedIcon === 1
      ? unit * 0.3
      : selectedIcon === 3
      ? unit * 0.014
      : selectedIcon === 4
      ? unit * 0.05
      : selectedIcon === 5
      ? unit * 0.185
      : 0;

  const weight = parseInt(roundedValue.toFixed(0));

  return (
    <>
      <form className="spendingForm">
        <div className="labelForm">
          <label>
            <div className="labelName">
              Libéllé
              <input
                className="nameInput"
                type="text"
                name="name"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="labelDate">
              Date
              <input
                className="dateInput"
                type="date"
                name="date"
                onChange={(event) => {
                  setDate(event.target.value);
                }}
              />
            </div>
          </label>
        </div>
        <div className="categoryForm">
          <h3 className="labelName">Catégories:</h3>
          <div className="categoriesIcons">
            {TRANSPORTS_PARAMS.map((el) => {
              return (
                <div>
                  <button
                    className="iconBtn"
                    onClick={(event) => {
                      event.preventDefault();
                      handleSelectCategory(el.id, el.category);
                    }}
                    key={el.id}
                  >
                    {el.icon}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        {selectedIcon ? (
          <div className="unitForm">
            {TRANSPORTS_PARAMS.filter((item) => item.id === selectedIcon).map(
              (el) => {
                return (
                  <SliderComponent
                    value={unit}
                    setValue={setUnit}
                    min={el.min}
                    max={el.max}
                    result={weight}
                    idicon={selectedIcon}
                  />
                );
              }
            )}
          </div>
        ) : (
          ""
        )}

        <button className="addSpendingBtn" onClick={submit}>
          Ajouter ma dépense
        </button>
      </form>
    </>
  );
}

export default CarbonSpending;
