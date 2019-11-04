/* eslint-disable jest/valid-expect */
/* eslint-disable no-undef */
/// <reference types="Cypress" />
// import cy from '@testing-library/cypress'
import faker from "faker";

faker.locale = "ru";

describe("Логин", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });
  it("Логинится в систему под пользователем alexeykass", () => {
    cy.visit("/");

    cy.get("[name='login']")
      .clear()
      .type("alexeykass");

    cy.get("[name='password']")
      .clear()
      .type("alexeykass");

    cy.findByText("Log In").click();

    // cy.location({ timeout: 20000 }).should(loc => {
    //   expect(loc.pathname).to.eq("/admin/users");
    // });
    cy.reload({ timeout: 3000 });
    // проверка на восстановление после reload
    cy.queryByText("not authorized").should("not.exist");
  });
  // it("Отмена регистрации ведёт на авторизацию", () => {
  //   cy.visit("/register");
  //   cy.findByText("Отмена").click();
  //   cy.contains("Авторизация");
  // });
  it("Не логинится в систему под  отсутствующим пользователем (alexey)", () => {
    cy.visit("/");

    cy.get("[name='login']")
      .clear()
      .type("alexey");

    cy.get("[name='password']")
      .clear()
      .type("alexey");

    cy.findByText("Log In").click();

    cy.location({ timeout: 20000 }).should(loc => {
      expect(loc.pathname).to.eq("/admin/users");
    });
    cy.reload({ timeout: 3000 });
    // проверка на восстановление после reload
    cy.queryByText("not authorized").should("not.exist");
  });
  // it("Новый пользователь может зарегистрироваться", () => {
  //   cy.visit("/register");

  //   const userName = faker.internet.userName();
  //   cy.findByLabelText("Введите логин:").type(userName);
  //   const email =
  //     new Date().getTime().toString() +
  //     faker.internet.email().replace(/\.+$/, "");

  //   // Валидация email
  //   cy.findByLabelText("Введите email:")
  //     .type("9832ksdjf")
  //     .blur()
  //     .focus();
  //   cy.contains("Неверный формат e-mail");

  //   // Не работает cy.findByLabelText если у label два потомка
  //   cy.get("input[name='email']").type(email);

  //   const lastName = faker.name.lastName(0);
  //   cy.findByLabelText("Фамилия:").type(lastName);
  //   const firstName = faker.name.firstName(0);
  //   const middleName = faker.name.findName(0);
  //   cy.findByLabelText("Имя:").type(firstName);
  //   cy.findByLabelText("Отчество:").type(middleName);
  //   cy.findByLabelText("Должность:").type(faker.name.jobTitle());
  //   cy.findByLabelText("Введите пароль:").type("dev12345");

  //   cy.findByLabelText("Повторите пароль:")
  //     .type("111")
  //     .blur()
  //     .focus();
  //   cy.findByText("Пароли не совпадают");
  //   cy.get("[name='passwordRepeat']")
  //     .clear()
  //     .type("dev12345")
  //     .blur();

  //   cy.findByText("Создать нового пользователя").click();

  //   cy.contains(lastName, { timeout: 30000 });
  //   cy.contains(firstName);
  // });

  // it("Существующий пользователь не может повторно зарегистрироваться", () => {
  //   cy.visit("/register");

  //   const userName = faker.internet.userName();
  //   cy.findByLabelText("Введите логин:").type(userName);

  //   // Не работает cy.findByLabelText если у label два потомка
  //   cy.get("input[name='email']").type("ab@ya1.ru");

  //   const lastName = faker.name.lastName(0);
  //   cy.findByLabelText("Фамилия:").type(lastName);
  //   const firstName = faker.name.firstName(0);
  //   const middleName = faker.name.findName(0);
  //   cy.findByLabelText("Имя:").type(firstName);
  //   cy.findByLabelText("Отчество:").type(middleName);
  //   cy.findByLabelText("Должность:").type(faker.name.jobTitle());
  //   cy.findByLabelText("Введите пароль:").type("dev12345");

  //   cy.findByLabelText("Повторите пароль:")
  //     .type("dev12345")
  //     .blur();

  //   cy.findByText("Создать нового пользователя").click();

  //   cy.contains("User or email already registered");
  // });
});
