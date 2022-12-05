import { render, screen } from '@testing-library/react';
import App from './App';
import renderer from 'react-test-renderer';
import {Link} from "react-router-dom";
import React from "react";
import formatResponse  from "./Utils"
/*
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Библиотека/);
  expect(linkElement).toBeInTheDocument();
});

test('render buttons', () => {
    render(<App />);
    const btn1 = screen.getByText(/Получить список книг/);
    const btn2 = screen.getByText(/Получить список авторов/);
    const btn3 = screen.getByText(/Очистить/);


  expect(btn1,btn2,btn3).toBeInTheDocument();
})

test('render fields',()=>{
    render(<App />);
        const field1 = screen.getByText(/Добавить книгу/);
    const field2 = screen.getByText(/Добавить автора/);


  expect(field1,field2).toBeInTheDocument();
})

it('button render test', () => {
 const result = renderer.create(<button
className="btn btn-sm btn-primary"
 />).toJSON();
 expect(result).toMatchSnapshot();
});

it('link back render test', () => {
 const result = renderer.create(<Link to={"/"}
 />).toJSON();
 expect(result).toMatchSnapshot();
});

it('result table render test', () => {
 const result = renderer.create(<table className="result-table"
 />).toJSON();
 expect(result).toMatchSnapshot();
});*/
it('check error format response ', () => {
 const result = {
        headers: "123",
        data: {
           asd: "123",
         error:"123123"
        }
      };
expect(formatResponse(result)).toEqual("123123");
})
it('check format response ', () => {
 const result2 = {
        headers: "123",
        data: {
           asd: "123"
        }
      };
expect(formatResponse(result2)).toEqual("");
})