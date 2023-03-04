// ІМПОРТУЄМО БІБЛІОТЕКИ БЕЗ ЯКИХ НЕ МОЖЕМО ПИСАТИ КОД
import React from "react";
import styled from "styled-components";

// ІМПОРТУЄМО ПОТРІБНІ КОМПОНЕНТИ
import Page from "./component/Page";
import Header from "./component/Header";
import Balance from "./component/Balance";
import Menu from "./component/Menu";
import Payment from "./component/Payment";

// КОНФІГУРАЦІЯ ========================================

const START_BALANCE = 0;
const LIMIT_BALANCE = 100000;
const GET_MONEY = 100;
const SALARY_AMOUNT = 1000;
const COURCE_PRICE = 850;

export default function App() {
  // ФУНКЦІОНАЛ БАЛАНСУ ========================

  // Ось тут тримаємо актуальне значення балансу

  const [balance, setBalance] = React.useState(START_BALANCE);

  // Функція для прямого поповнення балансу
  const getMoney = () => setBalance(balance + GET_MONEY);

  // Функція яка виконується кожен раз коли наш баланс змінився
  React.useEffect(() => {
    // Перевірка на ліміт балансу
    if (balance > LIMIT_BALANCE) {
      alert(`Ваш ліміт балансу: ${LIMIT_BALANCE}`);
      setBalance(START_BALANCE);
    }

    // Перевірка на мінусовий баланс
    if (balance < 0) {
      alert(`Ви використали усі свої гроші. Поповніть картку`);
      // setBalance(0);
    }
    // Сюди записуються змінні при оновленні яких буде виконуватися функція
  }, [balance]);

  // ФУНКЦИОНАЛ ТРАНЗАКЦИЙ====================================
  const [payment, setPayment] = React.useState([]);
  const getSalary = () => {
    setBalance(balance + SALARY_AMOUNT);
    setPayment([
      {
        name: "Зарплата",
        amount: SALARY_AMOUNT,
        type: "+"
      },
      ...payment
    ]);
  };
  const buyCource = () => {
    setBalance(balance - COURCE_PRICE);
    setPayment([
      {
        name: "Купити курс",
        amount: COURCE_PRICE,
        type: "-"
      },
      ...payment
    ]);
  };
  const buyFood = () => {
    setBalance(balance - 20);
    setPayment([
      {
        name: "Купить еду",
        amount: 20,
        type: "*"
      },
      ...payment
    ]);
  };

  // ВЕРСТКА ІНТЕРФЕЙСУ ==========================================

  // ця функція відкриває вікно в браузері з текстом
  const LOGIN = "Alex";
  const PASSWORD = "12345";
  const [isLogged, setLogged] = React.useState(false);
  const doLogin = () => {
    const login = prompt("Ваш логин");
    const password = prompt("Ваш пароль");
    if (login === LOGIN && password === PASSWORD) {
      alert("Вы вошли!");
      setLogged(true);
    } else {
      if (login !== LOGIN && password !== PASSWORD) {
        return alert("Неверный логин и пароль!!!");
      }
      if (login !== LOGIN) {
        return alert("Неверный логин!");
      }
      if (password !== PASSWORD) {
        return alert("Неверный пароль!");
      }
    }
  };
  // const HelloWorld = () => alert("Hello World");

  return (
    <Page>
      {/* компонент шапки з нашою назвою
          також при кліку мишкою на шапку
          в нас визивається функція HelloWorld
      */}

      <Header name="IT-BRAINS BANK" onClick={doLogin} />

      {/* Компонент баланса в який передається
          Актуальне значення балансу  */}
      {isLogged && <Balance balance={balance} />}

      {/* Компонент меню з кнопками */}
      {isLogged && (
        <Menu
          // ось сюди ми передаємо конфігурацію кнопок
          config={[
            {
              name: "Поповнити баланс",
              onClick: getMoney,
              img: "/icon/get.svg"
            },
            {
              name: "Отримати зарплату",
              onClick: getSalary,
              img: "/icon/cat.svg"
            },
            {
              name: "Купити курс",
              onClick: buyCource,
              img: "/icon/dog.svg"
            },
            {
              name: "Еда",
              onClick: buyFood,
              img: "/icon/apple.svg"
            }
          ]}
        />
      )}

      {/* компонент списка наших транзакцій
          цей функціонал ми будемо робити на 3 уроці
      */}
      {isLogged && <Payment payment={payment} />}
      {isLogged === false && <NotLogged>Вам нужно войти в аккаунт.</NotLogged>}
      {/*!!!!!! Уважно! [] в параметрі payment є заглушкою */}
    </Page>
  );
}

const NotLogged = styled.div`
  padding: 100px 30px;
  background: #000;
  color: #fff;
  text-align: center;
  margin-top: 100px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;
