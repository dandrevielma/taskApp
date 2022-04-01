const GqlClient = require('graphql-request').GraphQLClient;
const endpoint = "https://api.8base.com/ckymbkwiz02w709mm5haec39s"
const token = "5df85bc3-bf5e-49ea-b6de-f3f8470880f2"
/*
 * ckyzeoemt013y09jm7him7kec
 */
 
 const client = new GqlClient(endpoint, {
     headers: {
         authorization: `Bearer ${token}`
     }
 });

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
 const finishTask = async (id, finished) => {
  const res = await client.request(taskFinish, {
    id,
    finished
  });
};
module.exports = async (event, ctx) => {
  const message = 'Task done';
  finishTask(id, finished)
  return {
    statusCode: 200,
    body: JSON.stringify({
      result: `Webhook received: ${message}`,
    }),
  };
};
