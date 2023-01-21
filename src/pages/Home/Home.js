import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { loadData } from "../../store/dataSlice";
import MainHeader from "../../Components/MainHeader/MainHeader";
import ExpenseTotalItem from "../../Components/ExpenseTotalItem/ExpenseTotalItem";
import LoadingSpinner from "../../Components/UI/LoadingSpinner/LoadingSpinner";
import AnimatedOpacityDiv from "../../Components/UI/AnimatedOpacityDiv/AnimatedOpacityDiv";
import classes from "./Home.module.css";

const Home = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [date, setDate] = useState(moment());

  const [todayAmount, setTodayAmount] = useState(0);
  const [monthAmount, setMonthAmount] = useState(0);
  const [yearAmount, setYearAmount] = useState(0);

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const dataState = useSelector((state) => state.data);
  const dateRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.token) return;
    dispatch(loadData(authState.token, setIsLoading, setAlert));
  }, [dispatch, authState, setIsLoading]);

  useEffect(() => {
    if (!dataState.user) return;

    let day = 0;
    let month = 0;
    let year = 0;

    
    for (let expense of dataState.user.expenses) {
      const expenseDate = moment(expense.date);
      console.log(
        expenseDate.format("D"),
        expenseDate.format("M"),
        expenseDate.format("YYYY")
      );
      if (expenseDate.format("YYYY") === date.format("YYYY")) {
        year += expense.amount;
      }

      if (
        expenseDate.format("M") === date.format("M") &&
        expenseDate.format("YYYY") === date.format("YYYY")
      ) {
        month += expense.amount;
      }

      if (
        expenseDate.format("D") === date.format("D") &&
        expenseDate.format("M") === date.format("M") &&
        expenseDate.format("YYYY") === date.format("YYYY")
      ) {
        day += expense.amount;
      }
    }

    setTodayAmount(day);
    setMonthAmount(month);
    setYearAmount(year);
  }, [dataState, date]);

  useEffect(() => {
    if (!authState.isAuthenticated) navigate("/auth");
  }, [authState, navigate]);

  const onDateChange = () => {
    setDate(moment(dateRef.current.value));
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner className={classes["loading-spinner"]}></LoadingSpinner>
      ) : (
        <AnimatedOpacityDiv className={`container ${classes.container}`}>
          <MainHeader alert={alert} setIsLoading={setIsLoading}></MainHeader>
          <div className={`${classes["main"]}`}>
            <input
              onChange={onDateChange}
              ref={dateRef}
              value={date.format("YYYY-MM-DD")}
              className={classes["date-input"]}
              type="date"
            />
            <div className={classes["expense-boxes"]}>
              <ExpenseTotalItem amount={todayAmount} title={date.format("D MMMM YYYY")} />
              <ExpenseTotalItem
                amount={monthAmount}
                title={date.format("MMMM")}
              />
              <ExpenseTotalItem
                amount={yearAmount}
                title={date.format("YYYY")}
              />
            </div>
          </div>
        </AnimatedOpacityDiv>
      )}
    </div>
  );
};

export default Home;
