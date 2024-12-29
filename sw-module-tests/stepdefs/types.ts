// specific 

import { defineParameterType } from '@cucumber/cucumber';


export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    NONE = ''
}
function stringToHttpMethod(value: string): HttpMethod {
    return (Object.values(HttpMethod) as string[]).includes(value) ? (value as HttpMethod) : HttpMethod.NONE;
}

defineParameterType({
    name: 'HTTP-REQUEST',
    regexp: /GET|POST|DELETE/,
    transformer: s => stringToHttpMethod(s)
});
