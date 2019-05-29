import {AxiosResponse} from "axios";

export class NotImplementedError extends Error {
  constructor() {
    super("This feature is still not implemented yet.");
  }
}

export class NotOnlyCubeError extends Error {
  constructor(cubeName: string) {
    super(`A cube named '${cubeName}' is present in more than one server.`);
  }
}

export class InvalidServerError extends URIError {
  constructor(url: string) {
    super(`The URL "${url}" is not a valid Tesseract OLAP server.`);
  }
}

export class QueryServerError extends Error {
  status: number;
  body: string;

  constructor(response: AxiosResponse<any>) {
    super();

    try {
      if (typeof response.data === "string") {
        this.message = JSON.parse(response.data).error;
      }
      else {
        this.message = response.data.error;
      }
    } catch (e) {
      this.message = response.statusText;
    }

    this.status = response.status;
    this.body = response.data;
  }
}

export class PropertyMissingError extends ReferenceError {
  constructor(
    ownerName: string,
    ownerType: string,
    propName: string,
    propType: string = "property"
  ) {
    super(`The "${propName}" ${propType} doesn't exist in ${ownerType} "${ownerName}".`);
  }
}

export class AnnotationMissingError extends PropertyMissingError {
  constructor(ownerName: string, ownerType: string, annKey: string) {
    super(ownerName, ownerType, annKey, "annotation");
  }
}

export class DimensionMissingError extends PropertyMissingError {
  constructor(cubeName: string, dimName: string) {
    super(cubeName, "cube", dimName, "dimension");
  }
}

export class LevelMissingError extends PropertyMissingError {
  constructor(cubeName: string, lvlName: string) {
    super(cubeName, "cube", lvlName, "level");
  }
}

export class MeasureMissingError extends PropertyMissingError {
  constructor(cubeName: string, msrName: string) {
    super(cubeName, "cube", msrName, "measure");
  }
}
