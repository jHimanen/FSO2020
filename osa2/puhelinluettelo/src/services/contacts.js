import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data)
}

const create = newContact => {
    const request = axios.post(baseUrl, newContact);
    return request.then(response => response.data)
}

const nuke = nukedContact => {
    const request = axios.delete(baseUrl.concat(`/${nukedContact.id}`));
    return request.then(response => response.data)
}

const update = updatedContact => {
    const request = axios.put(baseUrl.concat(`/${updatedContact.id}`), updatedContact);
    return request.then(response => response.data)
}

export default { getAll, create, nuke, update };