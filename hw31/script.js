async function getData(segment) { 
    const baseUrl = 'https://jsonplaceholder.typicode.com'; 
    try { 
        const response = await fetch(`${baseUrl}${segment}`); 
        if (!response.ok) { return response.status; } 
        const data = await response.json(); 
        console.log(data); 
        return data; 
    } catch (error) { 
        console.error(error); 
        return error.message; 
    } 
}

async function postData(segment, data) { 
    const baseUrl = 'https://jsonplaceholder.typicode.com'; 
    try { 
        const response = await fetch(`${baseUrl}${segment}`, { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(data) 
        }); 
        if (!response.ok) { return `Error: ${response.status}`; } 
        const result = await response.json(); 
        console.log(result); 
        return result; 
    } catch (error) { 
        console.error(error); 
        return error.message; 
    } 
}

async function putData(id, data) { 
    const baseUrl = 'https://jsonplaceholder.typicode.com/posts'; 
    try { 
        const response = await fetch(`${baseUrl}/${id}`, { 
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(data) 
        }); 
        if (!response.ok) { return `Error: ${response.status}`; } 
        const result = await response.json(); 
        console.log(result); 
        return result; 
    } catch (error) { 
        console.error(error); 
        return error.message; 
    } 
}

async function patchData(id, data) { 
    const baseUrl = 'https://jsonplaceholder.typicode.com/posts'; 
    try { 
        const response = await fetch(`${baseUrl}/${id}`, { 
            method: 'PATCH', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(data) 
        }); 
        if (!response.ok) { return `Error: ${response.status}`; } 
        const result = await response.json(); 
        console.log(result); 
        return result; 
    } catch (error) { 
        console.error(error); 
        return error.message; 
    } 
}

async function deleteData(id) { 
    const baseUrl = 'https://jsonplaceholder.typicode.com/posts'; 
    try { 
        const response = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' }); 
        if (!response.ok) { 
            console.log(`Failed to delete post with id ${id}. Status: ${response.status}`); 
            return response.status; 
        } 
        console.log(`Post with id ${id} has been successfully deleted.`); 
        return true; 
    } catch (error) { 
        console.error(`Error during deletion: ${error.message}`); 
        return error.message; 
    } 
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('postId');
    const button = document.getElementById('loadBtn');
    const resultBlock = document.getElementById('result');

    button.addEventListener('click', async () => {
        const id = input.value; 

        if (!id) {
            resultBlock.textContent = 'Будь ласка, введіть число!';
            return;
        }

        resultBlock.textContent = 'Завантаження даних...';

        const data = await getData(`/posts/${id}`);
        resultBlock.textContent = JSON.stringify(data, null, 2);
    });
});

export { getData, postData, putData, patchData, deleteData };
