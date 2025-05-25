"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodo = exports.getTodos = exports.createTodos = void 0;
const Todos_1 = require("../models/Todos");
const createTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    try {
        const newTodo = yield Todos_1.Todos.create({ title });
        res.status(200).json({ message: "New Todo Added", todo: newTodo });
    }
    catch (error) {
        console.log("createTodos controller error" + error);
    }
});
exports.createTodos = createTodos;
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newTodo = yield Todos_1.Todos.find();
    try {
        res.status(200).json({ message: "All todos fetched", todos: newTodo });
    }
    catch (error) {
        console.log("getTodos controller error" + error);
    }
});
exports.getTodos = getTodos;
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId } = req.params;
    try {
        const newTodo = yield Todos_1.Todos.findById(todoId);
        res.status(200).json({ message: " todo fetched", todo: newTodo });
    }
    catch (error) {
        console.log("getTodo controller error" + error);
    }
});
exports.getTodo = getTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId } = req.params;
    const { title } = req.body;
    try {
        const updatedTodo = yield Todos_1.Todos.findByIdAndUpdate(todoId, { title });
        res
            .status(200)
            .json({ message: " todo has been updated", todo: updatedTodo });
    }
    catch (error) {
        console.log("getTodo controller error" + error);
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId } = req.params;
    try {
        yield Todos_1.Todos.findByIdAndDelete(todoId);
        res.status(200).json({ message: "Todo has been deleted." });
    }
    catch (error) {
        console.log(error);
        res.status(200).json({ message: "Something went wrong." });
    }
});
exports.deleteTodo = deleteTodo;
