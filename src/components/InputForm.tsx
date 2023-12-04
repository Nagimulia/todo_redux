"use client";

import React, { FormEvent, useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import TodoList from "./TodoList";
import ErrMsg from "./messages/ErrMesg";
import SuccessMsg from "./messages/SuccessMsg";
import { useDispatch,useSelector  } from "react-redux";
import { addTodo } from "@/redux/TodoSlice";
import { motion } from "framer-motion";

interface Todos {
  id: number;
  text: string;
  todo: string;
}

const InputForm = () => {
  const dispatch = useDispatch();
	const todoList = useSelector((state: any) => state.todo.todoList);
  const [todoValue, setTodoValue] = useState("");
  const [category, setCategory] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
	const [todoArray, setTodoArray] = useState<{ id: number; text: string }[]>(
    []
  );
  const options = [
    {
      _id: 1,
      title: "статус",
    },
    {
      _id: 2,
      title: "срочные",
    },
    {
      _id: 3,
      title: "есть время",
    },
  ];

  const handleTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoValue === "") {
      setErrMsg("Напишите,что хотите сделать");
      setShowErr(true);
    } else if (category === "") {
      setErrMsg("Выберите статус задачи");
      setShowErr(true);
      setShowSuccess(false);
    } else if (category === "categories") {
      setErrMsg("Выберите допустимую категорию");
      setShowErr(true);
      setShowSuccess(false);
    } else {
			const newTodo = {
        id: Math.random(),
        text: todoValue,
      };
      dispatch(
        addTodo({ id: Math.random(), todo: todoValue, category: category })
      );
      setTodoValue("");
      setShowSuccess(true);
      setShowErr(false);
      setSuccessMsg("Задача добавлена");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      showErr && setShowErr(false);
      showSuccess && setShowSuccess(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showErr, showSuccess]);

	const handleDeleteTodo = (idToDelete: number) => {
    const updatedTodos = todoArray.filter((item) => item.id !== idToDelete);
    setTodoArray(updatedTodos);
    setSuccessMsg("Задача удалена");
  };

  return (
    <div className="w-full bg-bodyColor flex flex-col gap-4">
      <div className="flex flex-col mdl:flex-row items-center gap-4 mdl:h-12">
        <input
          onChange={(e) => setTodoValue(e.target.value)}
          value={todoValue}
          type="text"
          placeholder="Что хотите сделать"
          className="w-full mdl:w-[80%] h-12 mdl:h-full bg-bodyColor border-[1px] border-gray-400 py-2 px-4 placeholder:text-gray-400 text-white text-base placeholder:text-sm tracking-wide rounded-md outline-none focus-visible:border-orange-600 hover:border-white"
        />
        <div className="w-full mdl:w-[20%] h-12 mdl:h-full relative">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-full text-center outline-none bg-bodyColor border-[1px] border-gray-400 px-1 cursor-pointer appearance-none rounded-md focus-visible:border-orange-600 hover:border-white"
          >
            {options.map((item) => (
              <option key={item._id}>{item.title}</option>
            ))}
          </select>
          <span className="absolute right-3 top-4">
            <FaChevronDown />
          </span>
        </div>
      </div>
      <button
        onClick={handleTodo}
        className="w-full border-[1px] border-gray-400 hover:border-gray-200 duration-300 font-titleFont font-semibold tracking-wider text-gray-300 hover:text-orange-600 h-10 uppercase rounded-md"
      >
        Добавить задачу
      </button>
      <div className="flex flex-col gap-4">
        <ul className="grid grid-cols-1 gap-4 border border-gray-600 shadow-todoShodow mt-6 p-4">
				{todoList.length > 0 ? (
            <>
              {" "}
              {todoList.map((item:any) => (
                <TodoList key={item.id} todo={item.todo} id={item.id} />
              ))}
            </>
          ) : (
            <p className="text-center text-base text-yellow-500 font-titleFont font-medium tracking-wide">
              Список задач пуст
            </p>
          )}
        </ul>
      </div>
      {showErr && <ErrMsg errMsg={errMsg} />}
      {showSuccess && <SuccessMsg successMsg={successMsg} />}
    </div>
  );
};

export default InputForm;
