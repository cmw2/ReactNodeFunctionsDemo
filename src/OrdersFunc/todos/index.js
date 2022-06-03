let appInsights = require("applicationinsights");
appInsights.setup().start();
var Connection = require("tedious").Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const { url } = require('url');

const executeSQL = (context, verb, payload) => new Promise((resolve, reject) => {
    var result = "";
    const paramPayload = (payload != null) ? JSON.stringify(payload) : '';
    //context.log(`Payload: ${JSON.stringify(payload)}`);

    const connection = new Connection({
        server: process.env["db_server"],
        authentication: {
            type: 'default',
            options: {
                userName: process.env["db_user"],
                password: process.env["db_password"],
            }
        },
        options: {
            database: process.env["db_database"],
            encrypt: true,
        }
    });

    const request = new Request(`web.${verb}_todo`, (err) => {
        if (err) {
            reject(err);
        } else {
            if ((result == "" || result == null || result == "null")) result = "[]";
            resolve(result);
        }
    });

    request.addParameter('payload', TYPES.NVarChar, paramPayload, Infinity);

    request.on('row', columns => {
        columns.forEach(column => {
            result += column.value;
        })
    });
    
    connection.on('connect', err => {
        if (err) {
            reject(err);
        } else {
            connection.callProcedure(request);
        }
    });

    connection.connect();
});

const httpTrigger = async function (context, req) {
    const method = req.method.toLowerCase();
    var payload = null;

    enrichToDo = function (source)
    {
        var todoUrl = new URL(req.url);
        //console.log(`Result: ${source}`);                
        var todo = JSON.parse(source);
        if (todo instanceof Array) {
            todo.forEach(e => {
                e.url = `${todoUrl.origin}/api/todo/${e.id}`
            });    
        } else {
            todo.url = `${todoUrl.origin}/api/todo/${todo.id}`
        }
        return todo;
    }

    setContext = function (body, status = 200) {
        context.res.status = status;
        context.res.body = body;
        context.done();
    };

    var prefix = method;
    switch (method) {
        case "get":
            payload = req.params.id ? { "id": req.params.id } : null;
            break;
        case "post":
            payload = req.body;
            break;
        case "put":
        case "patch":
            payload = {
                "id": req.params.id,
                "todo": req.body
            };
            prefix = "put";
            break;
        case "delete":
            payload = req.params.id ? { "id": req.params.id } : null;
            break;
    }

    await executeSQL(context, prefix, payload)
        .then(ok => {
            todo = enrichToDo(ok);
            setContext(todo);
        })
        .catch(err => {
            context.log.error(err);
            setContext("Error while executing SQL statement", 500);
        });
}

//module.exports = todoREST;

module.exports = async function contextPropagatingHttpTrigger(context, req) {
    // Start an AI Correlation Context using the provided Function context
    const correlationContext = appInsights.startOperation(context, req);

    // Wrap the Function runtime with correlationContext
    return appInsights.wrapWithCorrelationContext(async () => {
        //const startTime = Date.now(); // Start trackRequest timer

        // Run the Function
        const result = await httpTrigger(context, req);

        // Track Request on completion
        // appInsights.defaultClient.trackRequest({
        //     name: context.req.method + " " + context.req.url,
        //     resultCode: context.res.status,
        //     success: true,
        //     url: req.url,
        //     time: new Date(startTime),
        //     duration: Date.now() - startTime,
        //     id: correlationContext.operation.parentId,
        // });
        appInsights.defaultClient.flush();

        return result;
    }, correlationContext)();
};

// module.exports = async function (context, req) {
//     context.log('JavaScript HTTP trigger function processed a request.');

//     const 

//     const name = (req.query.name || (req.body && req.body.name));
//     const responseMessage = name
//         ? "Hello, " + name + ". This HTTP triggered function executed successfully."
//         : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

//     context.res = {
//         // status: 200, /* Defaults to 200 */
//         body: responseMessage
//     };
// }