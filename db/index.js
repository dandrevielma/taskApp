const GqlClient = require('graphql-request').GraphQLClient;
const endpoint = "https://api.8base.com/ckymbkwiz02w709mm5haec39s"
const token = "5df85bc3-bf5e-49ea-b6de-f3f8470880f2"

const client = new GqlClient(endpoint, {
    headers: {
        authorization: `Bearer ${token}`
    }
});

// LIST //////////////////////////////////////////////////////////////////////////////
const taskList = `query {
    tasksList {
        count
        items {
            id
            title
            description
            finished
        }
    }
}`;

// CREATE //////////////////////////////////////////////////////////////////////////////
const taskCreate = `
mutation($title: String!, $description: String!) {
        taskCreate(
            data: {
                title: $title
                description: $description
            }){
                title
                description
            }
    }
`;

// UPDATE //////////////////////////////////////////////////////////////////////////////
const taskUpdate = `
mutation($id: ID!, $title: String!, $description: String!) {
        taskUpdate(filter: {id: $id}, data: {
            title: $title
            description: $description
        }){
            id
            title
            description
        }
    }
`;
// FINISH / UNDO //////////////////////////////////////////////////////////////////////////////
const taskFinish = `
mutation($id: ID!, $finished: Boolean!) {
        taskUpdate(filter: {id: $id}, data: {
            finished: $finished
        }){
            id
            finished
        }
    }
`;
// DELETE //////////////////////////////////////////////////////////////////////////////
const taskDelete = `
mutation($id: ID!) {
        taskDelete(filter: {id: $id})
        {
            success
        }
    }
`;


export const showTasks = async () => {
    const resp = await client.request(taskList);
    const {id, title, description, finished} = resp;
    return resp
};
export const addTask = async (title, description) => {
    const resp = await client.request(taskCreate, {
        title,
        description
    });
    console.log(resp);
};
export const updateTask = async (id, title, description, finished) => {
    const resp = await client.request(taskUpdate, {
        id,
        title,
        description,
        finished
    });
    console.log(resp);
};
export const finishTask = async (id, finished) => {
    const resp = await client.request(taskFinish, {
        id,
        finished
    });
};
export const deleteTask = async (id) => {
    const resp = await client.request(taskDelete, {
        id
    });
};

// showTasks();

// addTask('sleep', 'sleep early');

// updateTask('ckymbzfpr002w09l07hdj3sxl', 'read', 'read a book', false)

// finishTask('ckymbzfpr002w09l07hdj3sxl', true)

// deleteTask('ckymbzfpr002w09l07hdj3sxl');