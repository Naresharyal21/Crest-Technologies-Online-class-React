import React from 'react'

const SearchTodo =({todos,searchQuery})=>{
    
    const filteredTodos = todos.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
       
    );
    if(searchQuery.trim() ==='') {
        return null;
    }
    return(
        <>
        
        <h2>Search Results:</h2>
        {filteredTodos.length === 0 ? (
                <p>No results found</p> 
            ) : (
      
        
        <table>
                <thead>
                    <tr>
                        <th>S.N.</th>
                        <th>Created At</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredTodos.map((todo, index) => (
                            <tr key={index} >
                                <td style={{ border: "1px solid black" }}>{index + 1}</td>
                                <td style={{ border: "1px solid black" }}>{todo.createdAt}</td>
                                <td style={{ border: "1px solid black" }}>{todo.title}</td>
                                <td style={{ border: "1px solid black" }}>{todo.description}</td>
                                <td style={{ border: "1px solid black" }}>{todo.status}</td>
                                <td style={{ border: "1px solid black" }}>
                                   
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            )}
        </>
    )
    
};
export default SearchTodo;
