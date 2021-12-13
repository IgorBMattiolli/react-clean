export enum HTTP_STATUS_CODE {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNATHORIZED = 401,
  NOT_FOUND = 404,
  SERVER_ERROR = 401,
}
export type HttpResponse = {
  statusCode: HTTP_STATUS_CODE;
  body?: any;
};
