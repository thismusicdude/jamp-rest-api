import { defineParameterType } from '@cucumber/cucumber';

defineParameterType({
    name: 'HTTP-REQUEST',
    regexp: /GET|POST|DELETE/,
    transformer: s => s
});
