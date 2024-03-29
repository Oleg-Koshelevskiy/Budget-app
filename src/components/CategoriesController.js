import Input from "./UI/Input";
import Button from "./UI/Button";
import Select from "./UI/Select";
import Card from "./UI/Card";
import { useContext, useState } from "react";
import BudgetContext from "../store/budget-context";
import styles from "./CategoriesController.module.css";

const CategoriesController = () => {
  const [expenseName, setExpenseName] = useState("");
  const [incomeName, setIncomeName] = useState("");
  const [selectedExpense, setSelectedExpense] = useState();
  const [selectedIncome, setSelectedIncome] = useState();
  const context = useContext(BudgetContext);

  const newExpenseItemHandler = (event) => {
    setExpenseName(event.target.value);
  };
  const newIncomeItemHandler = (event) => {
    setIncomeName(event.target.value);
  };

  const selectedExpenseHandler = (event) => {
    console.log(event.target.value);
    setSelectedExpense(event.target.value);
  };
  const selectedIncomeHandler = (event) => {
    console.log(event.target.value);
    setSelectedIncome(event.target.value);
  };

  const addNewExpenseItemHandler = (event) => {
    event.preventDefault();
    const newExpenseItem = {
      category: expenseName,
      categoryName: expenseName,
    };
    console.log(newExpenseItem);
    context.addExpenseCategory(newExpenseItem);
    setExpenseName("");
  };

  const addNewIncomeItemHandler = (event) => {
    event.preventDefault();
    const newIncomeItem = {
      category: incomeName,
      categoryName: incomeName,
    };
    console.log(newIncomeItem);
    context.addIncomeCategory(newIncomeItem);
    setExpenseName("");
  };

  const removeExpenseItemHandler = (event) => {
    event.preventDefault();
    if (!selectedExpense) return;
    context.removeExpenseCategory(selectedExpense);
    setSelectedExpense();
  };

  const removeIncomeItemHandler = (event) => {
    event.preventDefault();
    if (!selectedIncome) return;
    context.removeIncomeCategory(selectedIncome);
    setSelectedIncome();
  };

  const expenseList = context.expenseCategories.map((item) => {
    return (
      <option key={item.id} value={item.category}>
        {item.categoryName}
      </option>
    );
  });

  const incomesList = context.incomeCategories.map((item) => {
    return (
      <option key={item.id} value={item.category}>
        {item.categoryName}
      </option>
    );
  });

  return (
    <Card className={styles.generalForm}>
      <form>
        <label htmlFor="newExpense">Додати категорію витрат</label>
        <Input
          id="newExpense"
          type="text"
          onChange={newExpenseItemHandler}
          value={expenseName}
        />
        <Button onClick={addNewExpenseItemHandler}>+</Button>
      </form>
      <form onSubmit={removeExpenseItemHandler} id="expenseForm">
        <label htmlFor="removeExpense">Видалити категорію витрат</label>
        <Select
          onChange={selectedExpenseHandler}
          value={selectedExpense}
          form="expenseForm"
          id="removeExpense"
        >
          <option>--Оберіть категорію--</option>
          {expenseList}
        </Select>
        <Button type="submit">-</Button>
      </form>
      <form>
        <label htmlFor="newIncome">Додати категорію доходів</label>
        <Input
          id="newIncome"
          type="text"
          onChange={newIncomeItemHandler}
          value={incomeName}
        />
        <Button onClick={addNewIncomeItemHandler}>+</Button>
      </form>
      <form onSubmit={removeIncomeItemHandler} id="incomeForm">
        <label htmlFor="removeIncome">Видалити категорію доходів</label>
        <Select
          onChange={selectedIncomeHandler}
          value={selectedIncome}
          form="incomeForm"
          id="removeIncome"
        >
          <option>--Оберіть категорію--</option>
          {incomesList}
        </Select>
        <Button type="submit">-</Button>
      </form>
    </Card>
  );
};

export default CategoriesController;
