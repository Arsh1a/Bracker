import SuperTest from "supertest";
export const checkStatusCode = (res: any, expectedStatus: any = 200): SuperTest.Response => {
  if (res.status === expectedStatus) {
    return res;
  }
  const error = res.error;
  const reqData = JSON.parse(JSON.stringify(res)).req;
  throw new Error(` 
  request-method  : ${JSON.stringify(reqData.method)} 
  request-url     : ${JSON.stringify(reqData.url)}
  request-data    : ${JSON.stringify(reqData.data)}
  request-headers : ${JSON.stringify(reqData.headers)}
  reponse-status  : ${JSON.stringify(res.status)}
  reponse-body    : ${JSON.stringify(res.body)}
  `);
};
