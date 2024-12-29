// steps.js
import pactum from 'pactum';
import { Given, When, Then, Before } from '@cucumber/cucumber';
import Spec from 'pactum/src/models/Spec';

let spec: Spec = pactum.spec();

Before(() => {
  spec = pactum.spec();
});



enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

// TODO: fix code duplication
Given('a new {HTTP-REQUEST} request to {string} is made', (method: HttpMethod, url: string) => {
  spec = pactum.spec();

  switch (method) {
    case HttpMethod.GET:
      spec.get(url);
      break;
    case HttpMethod.PUT:
      spec.put(url);
      break;
    case HttpMethod.DELETE:
      spec.delete(url);
      break;
    case HttpMethod.POST:
      spec.post(url);
      break;
  }
});

Given('a {HTTP-REQUEST} request to {string} is made', (method: HttpMethod, url: string) => {
  switch (method) {
    case HttpMethod.GET:
      spec.get(url);
      break;
    case HttpMethod.PUT:
      spec.put(url);
      break;
    case HttpMethod.DELETE:
      spec.delete(url);
      break;
    case HttpMethod.POST:
      spec.post(url);
      break;
  }
});

When('a response was returned', async function () {
  await spec.toss();
});

Then('the response should have a status {int}', async function (code) {
  spec.response().should.have.status(code);
});

Then('the response should have a body', function (docString) {
  spec.response().should.have.body(docString);
});


Then('the response should have a json', function (docString) {
  spec.response().should.have.json(JSON.parse(docString));
});

