import React, { useState, useEffect } from 'react'
import { SlArrowUp,SlArrowDown } from "react-icons/sl";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit, CiSearch } from "react-icons/ci";



const TodoList = (props) => {
    const { todos, handleEdit, setSection } = props;

    const [updatedTodos, setUpdatedTodos] = useState(todos);

    useEffect(() => {

        setUpdatedTodos(todos);
    }, [todos]);

    const deleteTodo = (id) => {
        const newTodos = updatedTodos.filter((todo) => todo.id !== id);

        localStorage.setItem('todo', JSON.stringify(newTodos));

        setUpdatedTodos(newTodos);
    }

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();

        const filteredTodos = todos.filter((todo) => {
            return todo.title.toLowerCase().includes(searchValue);
        });

        setUpdatedTodos(filteredTodos);
    }

    const handleFilter = (e) => {
        const selectedValue = e.target.value;

        if (selectedValue === "all") {
            setUpdatedTodos(todos);
        } else {
            const filteredTodos = todos.filter((todo) => todo.status === selectedValue);

            setUpdatedTodos(filteredTodos);
        }
    }

    const getCompletedTodos = () => {
        const completedTodos = updatedTodos.filter((todo) => todo.status === "COMPLETED");

        return completedTodos.length;
    }

    const getInProgressTodos = () => {
        const completedTodos = updatedTodos.filter((todo) => todo.status === "IN PROGRESS");

        return completedTodos.length;
    }

    const getPendingTodos = () => {
        const completedTodos = updatedTodos.filter((todo) => todo.status === "PENDING");

        return completedTodos.length;
    }

    const getDate = (date) => {
        const dateObj = new Date(date);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };

        return dateObj.toLocaleDateString('en-US', options);
    }
    const [dateSort, setdateSort] = useState(true);
    
    
    const handleDatesort = () => {


        const sorted = [...updatedTodos].sort((a, b) =>
            dateSort
                ? new Date(a.createdAt) - new Date(b.createdAt)
                : new Date(b.createdAt) - new Date(a.createdAt)
        );

        setUpdatedTodos(sorted);
        setdateSort(!dateSort);
       

    };
    const [titlesort, settitlesort] = useState(true);

const handletitleSort = () => {
    const sorted = [...updatedTodos].sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        return titlesort
            ? titleA.localeCompare(titleB)  
            : titleB.localeCompare(titleA); 
    });

    setUpdatedTodos(sorted);
    settitlesort(!titlesort); 
};
const [descsort, setdescsort] = useState(true);
const handledescSort = () => {
    const sorted = [...updatedTodos].sort((a, b) => {
        const titleA = a.description.toLowerCase();
        const titleB = b.description.toLowerCase();

        return descsort
            ? titleA.localeCompare(titleB)  
            : titleB.localeCompare(titleA); 
    });

    setUpdatedTodos(sorted);
    setdescsort(!descsort); 
};
const [statussort, setstatussort] = useState(true);
const handledstatusSort = () => {
    const sorted = [...updatedTodos].sort((a, b) => {
        const titleA = a.status.toLowerCase();
        const titleB = b.status.toLowerCase();

        return statussort
            ? titleA.localeCompare(titleB)  
            : titleB.localeCompare(titleA); 
    });

    setUpdatedTodos(sorted);
    setstatussort(!statussort); 
};
    return (
        <div className='w-100'>
            <div className='flex w-100 justify-between align-items-center'>
                <div className='flex py-15 rf-m'>
                    <p className='mr-15 text-green'>Completed: {getCompletedTodos()}</p>
                    <p className='mr-15 text-blue'>In Progress: {getInProgressTodos()}</p>
                    <p className='mr-15 text-red'>Pending: {getPendingTodos()} </p>
                </div>

                <div className='flex py-15'>
                    <div className=" flex py-15 searchicon">
                        <div className="inner">{<CiSearch />}</div>
                        <input className='input mr-10' type="text" placeholder="Search" onChange={handleSearch} />
                    </div>

                    <select className='select mr-10 width' onChange={handleFilter}>
                        <option value="all">All</option>
                        <option value="PENDING">Pending</option>
                        <option value="IN PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                    <button className='button mr-10 width' onClick={() => setSection("add-todo")}>
                        Add Todo
                    </button>
                </div>
            </div>

            <table cellPadding={0} cellSpacing={0} className='w-100 table'>
                <thead  >
                    <tr >
                        <th   style={{ width: "50px", textAlign: "left", paddingTop: "11px" }}>S.N.</th>

                        <th  >
                            Created At
                            <button className='sortbtns ' onClick={handleDatesort}>
                                {dateSort ? <SlArrowUp /> : <SlArrowDown />}
                            </button>
                        </th>


                        <th style={{ width: "200px", textAlign: "left", paddingBottom: "10px" }}>Title 
                             <button className='sortbtns '
                         onClick={handletitleSort}>
                                {titlesort ? <SlArrowUp /> : <SlArrowDown />}
                            </button></th>

                        <th style={{ width: "350px", textAlign: "left", paddingBottom: "10px" }}>
                            Description <button className='sortbtns ' onClick={handledescSort}>
                                {handledescSort? <SlArrowUp /> : <SlArrowDown />}
                            </button></th>

                        <th style={{ width: "150px", textAlign: "left", paddingBottom: "10px" }}>
                            Status  <button className='sortbtns ' onClick={handledstatusSort}>
                                {handledstatusSort? <SlArrowUp /> : <SlArrowDown />}
                            </button></th>
                        <th style={{ textAlign: "left", paddingTop: "11px" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        updatedTodos.map((todo, index) => (
                            <tr key={index+1} >
                                <td className='border-1 py-10 '>{index + 1}</td>
                                <td className='border-1 py-10  '>{getDate(todo.createdAt)}</td>
                                <td className='border-1 py-10  '>{todo.title}</td>
                                <td className='border-1 py-10 '>{todo.description}</td>
                                <td className='border-1 py-10 '>{todo.status}</td>
                                <td className='border-1 py-10 '>
                                    <button className='rf-m  mr-10 btn-10' onClick={() => handleEdit(todo.id)}>{<CiEdit />}</button>
                                    <button className='rf-m mr-10 btn-10' onClick={() => deleteTodo(todo.id)}>{<MdDeleteOutline />}</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TodoList