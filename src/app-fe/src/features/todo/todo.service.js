export async function getAllTodos() {
    try {
        
        const response = await fetch('https://cmwms-orders.azurewebsites.net/api/todos');
        //const response = await fetch('http://localhost:7071/api/todos');
        console.log(response);
        return await response.json();
    } catch(error) {
        console.error(error);
        return [];
    }
}

export async function createTodo(data) {
    const response = await fetch('https://cmwms-orders.azurewebsites.net/api/todos', {
    //const response = await fetch('http://localhost:7071/api/todos', {
        method: 'POST',
        headers: {'Content-Type': 'application/jason'},
        body: JSON.stringify({user: data})
    })
    return await response.json();
}